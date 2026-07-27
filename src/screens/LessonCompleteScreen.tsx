import styles from './LessonCompleteScreen.module.css'
import type { Tab } from '../components/Sidebar/Sidebar'

export const COMPLETE_HEIGHT = 900

const REWARDS = [
  { icon: 'assets/complete-star.svg', value: '+25 XP', label: 'Опыт', color: '#ff742f' },
  { icon: 'assets/complete-apple.svg', value: '+1 Питание', label: 'Питание', color: '#34c759' },
  { icon: 'assets/complete-heart.svg', value: '4 из 5', label: 'Правильных', color: '#ff5959' },
]

type Props = {
  onNavigate?: (tab: Tab) => void
  /** Состояние с повышением уровня — добавляется баннер «Новый уровень» */
  levelUp?: boolean
}

export function LessonCompleteScreen({ onNavigate, levelUp }: Props) {
  return (
    <div className={styles.screen}>
      <div className={styles.lights} />

      <div className={styles.textBlock}>
        <h1 className={styles.title}>🎉 Урок пройден!</h1>
        <p className={styles.subtitle}>Отличная работа, Ваня!</p>
      </div>

      {levelUp && (
        <img className={styles.levelUp} src="assets/levelup-banner.png" alt="Новый уровень 5!" />
      )}

      <div className={styles.rewards}>
        {REWARDS.map((r, i) => (
          <div key={r.label} style={{ display: 'contents' }}>
            {i > 0 && <span className={styles.divider} />}
            <div className={styles.reward}>
              <img className={styles.rewardIcon} src={r.icon} alt="" />
              <div className={styles.rewardValues}>
                <span className={styles.rewardValue} style={{ color: r.color }}>
                  {r.value}
                </span>
                <span className={styles.rewardLabel}>{r.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.secondaryBtn} onClick={() => onNavigate?.('home')}>
          На главную
        </button>
        <button type="button" className={styles.primaryBtn} onClick={() => onNavigate?.('edu')}>
          Следующий урок
        </button>
      </div>
    </div>
  )
}
