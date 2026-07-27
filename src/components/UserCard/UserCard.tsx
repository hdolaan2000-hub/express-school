import styles from './UserCard.module.css'
import { useScale } from '../../ScaleContext'

/** Карточка пользователя. Живёт вне масштабируемой сцены и крепится к нижнему
 *  левому углу окна — поэтому видна при любом скролле. Масштабируется сама. */
export function UserCard() {
  const scale = useScale()
  return (
    <div
      className={styles.fixed}
      style={{
        left: 16 * scale,
        bottom: 16 * scale,
        transform: `scale(${scale})`,
        transformOrigin: 'bottom left',
      }}
    >
      <div className={styles.card}>
        <div className={styles.avatar}>
          <img className={styles.avatarImg} src="assets/avatar.png" alt="" />
        </div>
        <span className={styles.name}>Ваня Иванов</span>
        <span className={styles.role}>Ученик</span>
      </div>
    </div>
  )
}
