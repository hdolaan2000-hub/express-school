import type { ReactNode } from 'react'
import styles from './PromoBanner.module.css'

type Props = {
  variant: 'orange' | 'dark'
  title: string
  description: string
  action: string
  descriptionWidth: number
  children?: ReactNode
}

export function PromoBanner({
  variant,
  title,
  description,
  action,
  descriptionWidth,
  children,
}: Props) {
  return (
    <section className={`${styles.banner} ${styles[variant]}`}>
      {children}
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description} style={{ width: descriptionWidth }}>
        {description}
      </p>
      <button type="button" className={styles.action}>
        {action}
      </button>
    </section>
  )
}

export function OrangeBannerDecor() {
  return (
    <>
      <span className={styles.orangeSquare} />
      <img className={styles.orangeStar} src="assets/banner1-deco1.png" alt="" />
      <img className={styles.orangeBlob} src="assets/banner1-deco2.png" alt="" />
      <img className={styles.orangeChef} src="assets/banner1-chef.png" alt="" />
      <img className={styles.orangeBadge} src="assets/banner1-badge.png" alt="" />
    </>
  )
}

export function DarkBannerDecor() {
  return (
    <>
      <img className={styles.darkBlob1} src="assets/banner2-blob1.png" alt="" />
      <img className={styles.darkBlob2} src="assets/banner2-blob2.png" alt="" />
      <img className={styles.darkBlob3} src="assets/banner2-blob3.svg" alt="" />
      <img className={styles.darkChef} src="assets/banner2-chef.png" alt="" />
    </>
  )
}
