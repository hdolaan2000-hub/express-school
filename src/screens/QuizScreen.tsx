import { useState } from 'react'
import styles from './QuizScreen.module.css'
import type { Tab } from '../components/Sidebar/Sidebar'

export const QUIZ_HEIGHT = 944

type Answer = {
  emoji: string
  label: string
}

const ANSWERS: Answer[] = [
  { emoji: '🍅', label: 'Помидор' },
  { emoji: '🥬', label: 'Капуста' },
  { emoji: '🥒', label: 'Огурец' },
  { emoji: '🥕', label: 'Морковь' },
]

const CORRECT = 'Помидор'
/** Ответ из макета с ошибкой */
const MISTAKE = 'Капуста'

const DOTS = 5

export function QuizScreen({
  onClose,
  mistake,
}: {
  onClose?: (tab: Tab) => void
  mistake?: boolean
}) {
  const [picked, setPicked] = useState(mistake ? MISTAKE : CORRECT)
  const isWrong = picked !== CORRECT

  return (
    <div className={styles.inner}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <button type="button" className={styles.closeBtn} onClick={() => onClose?.('edu')}>
            <img src="assets/icon-close.svg" alt="Закрыть" width={16} height={16} />
          </button>
          <span className={styles.headerTitle}>Тайна пропавшего помидора</span>
          <div className={styles.headerStats}>
            <span className={`${styles.statPill} ${styles.heart}`}>
              <img src="assets/icon-heart-white.svg" alt="" width={20} height={20} />
              {/* За неверный ответ снимается жизнь — в макете с ошибкой их 2 */}
              <span>{isWrong ? 2 : 3}</span>
            </span>
            <span className={`${styles.statPill} ${styles.star}`}>
              <img src="assets/icon-star-white.svg" alt="" width={20} height={20} />
              <span>0</span>
            </span>
          </div>
        </div>

        <div className={styles.progress}>
          <div className={styles.progressLabels}>
            <span>Вопрос 1 из 5</span>
            <span>20%</span>
          </div>
          <div className={styles.track}>
            <div className={styles.trackFill} />
          </div>
        </div>
      </div>

      <section className={styles.question}>
        <h2 className={styles.questionText}>
          Какой овощ красного цвета используют для приготовления этого соуса?
        </h2>
        <img className={styles.questionImg} src="assets/quiz-photo.png" alt="" />
      </section>

      <button type="button" className={`${styles.navArrow} ${styles.navPrev}`} aria-label="Назад">
        <img src="assets/icon-arrow-right.svg" alt="" width={28} height={28} />
      </button>
      <button
        type="button"
        className={`${styles.navArrow} ${styles.navNext}`}
        aria-label="Далее"
        onClick={() => onClose?.('complete')}
      >
        <img src="assets/icon-arrow-right.svg" alt="" width={28} height={28} />
      </button>

      <div className={styles.options}>
        {ANSWERS.map((answer) => {
          const active = answer.label === picked
          // выбранный ответ: верный — зелёный с галочкой, неверный — красный
          const state = active ? (isWrong ? styles.optionWrong : styles.optionSelected) : ''
          return (
            <button
              key={answer.label}
              type="button"
              className={active ? `${styles.option} ${state}` : styles.option}
              onClick={() => setPicked(answer.label)}
            >
              <span className={styles.optionIcon}>{answer.emoji}</span>
              <span className={styles.optionText}>{answer.label}</span>
              {active && !isWrong && (
                <span className={styles.optionCheck}>
                  <img src="assets/icon-check-green.svg" alt="" width={17} height={14} />
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className={styles.dots}>
        {Array.from({ length: DOTS }, (_, i) => (
          <span key={i} className={i === 0 ? styles.dotActive : styles.dot} />
        ))}
      </div>
    </div>
  )
}
