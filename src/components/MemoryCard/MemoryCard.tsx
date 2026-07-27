import styles from './MemoryCard.module.css'

/** Длительность переворота — снята покадрово с видео-референса дизайнера */
export const FLIP_MS = 220

type Props = {
  emoji: string
  /** Карточка развёрнута лицом к игроку */
  open: boolean
  /** Пара найдена — состояние Pair из макета */
  matched: boolean
  disabled?: boolean
  onClick?: () => void
}

export function MemoryCard({ emoji, open, matched, disabled, onClick }: Props) {
  return (
    <button
      type="button"
      className={styles.card}
      disabled={disabled}
      onClick={onClick}
      aria-label={open ? emoji : 'Закрытая карточка'}
    >
      <span className={`${styles.inner} ${open ? styles.flipped : ''}`}>
        <span className={`${styles.face} ${styles.back}`}>
          <img className={styles.backArt} src="assets/card-back.svg" alt="" />
        </span>
        <span className={`${styles.face} ${styles.front} ${matched ? styles.matched : ''}`}>
          <span className={styles.emoji}>{emoji}</span>
        </span>
      </span>
    </button>
  )
}
