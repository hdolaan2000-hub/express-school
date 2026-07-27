import styles from './UserCard.module.css'
import { useScale } from '../../ScaleContext'

/** Карточка пользователя. Живёт вне масштабируемой сцены и крепится к нижнему
 *  левому углу окна — поэтому видна при любом скролле. Масштабируется сама.
 *  По клику открывает профиль (личный кабинет). */
export function UserCard({ onOpen }: { onOpen?: () => void }) {
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
      <button type="button" className={styles.card} onClick={onOpen}>
        <div className={styles.avatar}>
          <img className={styles.avatarImg} src="assets/avatar.png" alt="" />
        </div>
        <span className={styles.name}>Мага</span>
        <span className={styles.role}>Ученик</span>
      </button>
    </div>
  )
}
