import { useEffect, useRef, useState } from 'react'
import styles from './MemoryGameScreen.module.css'
import { MemoryCard, FLIP_MS } from '../components/MemoryCard/MemoryCard'

export const GAME_HEIGHT = 920

/** 10 пар — сетка 5×4 из макета */
const EMOJIS = ['🍅', '🥒', '🥕', '🌽', '🍆', '🥦', '🍄', '🫑', '🧄', '🧅']
const PAIRS = EMOJIS.length
const TOTAL = PAIRS * 2

/** Счётчики в шапке макета: 24 хода и 0 очков */
const START_MOVES = 24
const POINTS_PER_PAIR = 2

/** Сколько карточки лежат открытыми в начале партии */
const PREVIEW_MS = 2000
/** Задержка между карточками при закрытии — переворот идёт волной */
const STAGGER_MS = 40
/** Пауза перед тем, как закрыть непарные карточки */
const MISMATCH_MS = 800

function shuffled(): string[] {
  const deck = [...EMOJIS, ...EMOJIS]
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

/** Звук перелистывания вырезан из видео-референса дизайнера.
    Отдельный экземпляр на каждый переворот — иначе соседние карточки
    в каскаде глушат друг друга. Автоплей до первого клика может быть
    заблокирован браузером, поэтому ошибку гасим. */
function playFlip(volume = 1) {
  const audio = new Audio('assets/card-flip.mp3')
  audio.volume = volume
  void audio.play().catch(() => {})
}

type Phase = 'preview' | 'playing' | 'won' | 'lost'

export function MemoryGameScreen({ onExit }: { onExit?: () => void }) {
  const [round, setRound] = useState(0)
  const [deck, setDeck] = useState<string[]>(shuffled)
  const [faceUp, setFaceUp] = useState<boolean[]>(() => Array(TOTAL).fill(true))
  const [matched, setMatched] = useState<boolean[]>(() => Array(TOTAL).fill(false))
  const [selected, setSelected] = useState<number[]>([])
  const [moves, setMoves] = useState(START_MOVES)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState<Phase>('preview')

  const timers = useRef<number[]>([])
  const later = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  // Начало партии: все карточки лежат открытыми, потом закрываются каскадом
  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []

    setDeck(shuffled())
    setFaceUp(Array(TOTAL).fill(true))
    setMatched(Array(TOTAL).fill(false))
    setSelected([])
    setMoves(START_MOVES)
    setScore(0)
    setPhase('preview')

    for (let i = 0; i < TOTAL; i++) {
      later(PREVIEW_MS + i * STAGGER_MS, () => {
        playFlip(0.35)
        setFaceUp((prev) => prev.map((v, k) => (k === i ? false : v)))
      })
    }
    later(PREVIEW_MS + TOTAL * STAGGER_MS + FLIP_MS, () => setPhase('playing'))

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [round])

  const busy = phase !== 'playing' || selected.length >= 2

  const flip = (i: number) => {
    if (busy || faceUp[i] || matched[i]) return

    playFlip()
    setFaceUp((prev) => prev.map((v, k) => (k === i ? true : v)))

    const pick = [...selected, i]
    setSelected(pick)
    if (pick.length < 2) return

    const [a, b] = pick
    const movesLeft = moves - 1
    setMoves(movesLeft)

    if (deck[a] === deck[b]) {
      const foundPairs = matched.filter(Boolean).length / 2 + 1
      later(FLIP_MS + 120, () => {
        setMatched((prev) => prev.map((v, k) => (k === a || k === b ? true : v)))
        setScore((s) => s + POINTS_PER_PAIR)
        setSelected([])
        if (foundPairs === PAIRS) setPhase('won')
        else if (movesLeft === 0) setPhase('lost')
      })
    } else {
      later(MISMATCH_MS, () => {
        playFlip()
        setFaceUp((prev) => prev.map((v, k) => (k === a || k === b ? false : v)))
        setSelected([])
        if (movesLeft === 0) setPhase('lost')
      })
    }
  }

  const over = phase === 'won' || phase === 'lost'

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <button type="button" className={styles.closeBtn} onClick={onExit}>
            <img src="assets/icon-close.svg" alt="Закрыть" width={16} height={16} />
          </button>

          <div className={styles.titleBox}>
            <p className={styles.title}>Мини-игра Запоминайка</p>
          </div>

          <div className={styles.counters}>
            <div className={`${styles.pill} ${styles.pillMoves}`}>
              <img src="assets/icon-heart-white.svg" alt="Осталось ходов" width={20} height={20} />
              <span>{moves}</span>
            </div>
            <div className={`${styles.pill} ${styles.pillScore}`}>
              <img src="assets/icon-star-white.svg" alt="Очки" width={20} height={20} />
              <span>{score}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.board}>
        {deck.map((emoji, i) => (
          <MemoryCard
            key={i}
            emoji={emoji}
            open={faceUp[i]}
            matched={matched[i]}
            disabled={busy || faceUp[i]}
            onClick={() => flip(i)}
          />
        ))}
      </div>

      {over && (
        <div className={styles.backdrop}>
          <div className={styles.dialog}>
            <div className={styles.dialogText}>
              <h3 className={styles.dialogTitle}>
                {phase === 'won' ? 'Ты победил!' : 'Ты проиграл...'}
              </h3>
              <p className={styles.dialogSub}>
                {phase === 'won'
                  ? 'Попробуй побить свой рекорд!'
                  : 'Но можешь попробовать снова!'}
              </p>
            </div>
            <div className={styles.dialogButtons}>
              <button type="button" className={styles.btnHome} onClick={onExit}>
                Домой
              </button>
              <button
                type="button"
                className={styles.btnRestart}
                onClick={() => setRound((r) => r + 1)}
              >
                Заново
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
