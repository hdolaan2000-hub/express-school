import styles from './CourseCard.module.css'

export type CourseTheme = 'cooking' | 'tech' | 'health'

type Props = {
  icon: string
  tag: string
  theme: CourseTheme
  title: string
  subtitle: string
  /** Активный курс — оранжевая кнопка «Начать занятие!»; иначе «Записаться на курс!» */
  active?: boolean
  onStart?: () => void
}

export function CourseCard({ icon, tag, theme, title, subtitle, active, onStart }: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.thumb}>
        <img className={styles.icon} src={icon} alt="" />
      </div>

      <div className={styles.body}>
        <span className={`${styles.tag} ${styles[theme]}`}>
          <span className={styles.tagText}>{tag}</span>
        </span>
        <div className={styles.text}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>

      <button
        type="button"
        className={active ? `${styles.button} ${styles.buttonActive}` : styles.button}
        onClick={onStart}
      >
        {active ? 'Начать занятие!' : 'Записаться на курс!'}
      </button>
    </article>
  )
}
