import styles from './ContentCard.module.css'

type Props = {
  title: string
  duration: string
  kind: string
}

export function ContentCard({ title, duration, kind }: Props) {
  return (
    <article className={styles.card}>
      <img className={styles.image} src="assets/content-card.png" alt="" />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.meta}>
          <span>{duration}</span>
          <span className={styles.dot}>•</span>
          <span>{kind}</span>
        </div>
      </div>
    </article>
  )
}
