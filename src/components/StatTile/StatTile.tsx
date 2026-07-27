import type { CSSProperties } from 'react'
import styles from './StatTile.module.css'

type Props = {
  icon: string
  illustration: string
  title: string
  badge: string
  /** Цвет мягкой тени под иконкой — свой у каждой плитки */
  iconShadow: string
  illustrationStyle: CSSProperties
  onClick?: () => void
}

export function StatTile({
  icon,
  illustration,
  title,
  badge,
  iconShadow,
  illustrationStyle,
  onClick,
}: Props) {
  return (
    <article
      className={styles.tile}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      <img
        className={styles.illustration}
        style={illustrationStyle}
        src={illustration}
        alt=""
      />
      <div className={styles.iconWrap} style={{ boxShadow: `0 4px 12px 0 ${iconShadow}` }}>
        <img src={icon} alt="" width={44} height={44} />
      </div>
      <span className={styles.badge}>{badge}</span>
      <h3 className={styles.title}>{title}</h3>
    </article>
  )
}
