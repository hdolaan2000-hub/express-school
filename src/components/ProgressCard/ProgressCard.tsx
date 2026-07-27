import styles from './ProgressCard.module.css'

type Stat = {
  icon: string
  label: string
  value: string
  /** Доля заполнения дорожки, как в макете */
  fill: number
  color: string
  /** Точка старта градиента внутри заполненной части */
  gradientStart: string
  /** Ширина текстовой ноды со значением — задана в макете */
  valueWidth: number
}

const STATS: Stat[] = [
  {
    icon: 'assets/metric-health.svg',
    label: 'Здоровье',
    value: '75/100',
    fill: (336 - 89.34) / 336,
    color: '255, 59, 48',
    gradientStart: '27%',
    valueWidth: 40.94,
  },
  {
    icon: 'assets/metric-nutrition.svg',
    label: 'Питание',
    value: '85/100',
    fill: (336 - 53.6) / 336,
    color: '52, 199, 89',
    gradientStart: '16%',
    valueWidth: 42.06,
  },
  {
    icon: 'assets/metric-energy.svg',
    label: 'Энергия',
    value: '100/100',
    fill: 1,
    color: '255, 161, 0',
    gradientStart: '0%',
    valueWidth: 47.39,
  },
]

const LEVEL_FILL = (336 - 117.92) / 336

export function ProgressCard({ onStart }: { onStart?: () => void }) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <div className={styles.levelTitle}>
            <img className={styles.metricIcon} src="assets/metric-level.svg" alt="" />
            <h3 className={styles.levelHeading}>Уровень 5</h3>
          </div>
          <span className={styles.levelHint}>67% к уровню 6</span>
        </div>

        <div className={styles.track} style={{ background: 'rgba(255, 116, 47, 0.2)' }}>
          <div
            className={styles.trackFill}
            style={{
              width: `${LEVEL_FILL * 100}%`,
              background:
                'linear-gradient(90deg, rgba(255, 116, 47, 0) 35%, rgba(255, 116, 47, 1) 100%)',
            }}
          />
        </div>

        <p className={styles.caption}>Завершите ещё 3 урока для следующего уровня</p>
      </div>

      <div className={styles.stats}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <div className={styles.statRow}>
              <div className={styles.statLabel}>
                <img className={styles.metricIcon} src={stat.icon} alt="" />
                <span className={styles.statName}>{stat.label}</span>
              </div>
              <span className={styles.statValue} style={{ width: stat.valueWidth }}>
                {stat.value}
              </span>
            </div>
            <div className={styles.track} style={{ background: `rgba(${stat.color}, 0.2)` }}>
              <div
                className={styles.trackFill}
                style={{
                  width: `${stat.fill * 100}%`,
                  background: `linear-gradient(90deg, rgba(${stat.color}, 0) ${stat.gradientStart}, rgba(${stat.color}, 1) 100%)`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <button type="button" className={styles.cta} onClick={onStart}>
        Начать занятие!
      </button>
    </section>
  )
}
