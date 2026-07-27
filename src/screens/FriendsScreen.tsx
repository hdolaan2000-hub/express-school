import { useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './FriendsScreen.module.css'
import { useScale } from '../ScaleContext'

// Высота подогнана под контент (последний ряд + нижний отступ); список стал
// короче, поэтому меньше, чем раньше — без пустоты снизу.
export const FRIENDS_HEIGHT = 580

const AVATARS = {
  misha: 'assets/avatar-misha.png',
  katya: 'assets/avatar-katya.png',
  varya: 'assets/avatar-varya.png',
}

type Podium = {
  avatar: string
  name: string
  level: string
  xp: string
  ring: string
  first?: boolean
}

// Порядок в ряду — как на подиуме: 2-е место, 1-е (центр), 3-е
const PODIUM: Podium[] = [
  { avatar: AVATARS.katya, name: 'Фатима', level: 'Уровень 11', xp: '2,100 XP', ring: styles.ringSecond },
  { avatar: AVATARS.misha, name: 'Али', level: 'Уровень 12', xp: '2,450 XP', ring: styles.ringFirst, first: true },
  { avatar: AVATARS.varya, name: 'Алина', level: 'Уровень 10', xp: '1,890 XP', ring: styles.ringThird },
]

type Friend = {
  rank: string
  avatar: string
  name: string
  level: string
  self?: boolean
}

const FRIENDS: Friend[] = [
  { rank: '#4', avatar: AVATARS.misha, name: 'Патахъ', level: 'Уровень 9' },
  { rank: '#5', avatar: AVATARS.misha, name: 'Мага', level: 'Уровень 8', self: true },
]

export function FriendsScreen({ empty = false }: { empty?: boolean }) {
  // #friends-invite открывает модалку сразу (для дип-линка и статичного снимка)
  const [inviteOpen, setInviteOpen] = useState(
    () => window.location.hash === '#friends-invite',
  )
  const scale = useScale()

  const modal =
    inviteOpen &&
    createPortal(
      <div className={styles.backdrop} onClick={() => setInviteOpen(false)}>
        <div
          className={styles.modal}
          style={{ transform: `scale(${scale})` }}
          onClick={(e) => e.stopPropagation()}
        >
        <div className={styles.modalSection}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Пригласить друга</h3>
            <button type="button" className={styles.modalClose} onClick={() => setInviteOpen(false)}>
              <img src="assets/icon-close.svg" alt="Закрыть" width={16} height={16} />
            </button>
          </div>
        </div>

        <div className={styles.modalSection}>
          <span className={styles.modalLabel}>Твой код для друзей</span>
          <div className={styles.codeField}>
            <span className={styles.codeText}>MAGA-2847</span>
            <img src="assets/icon-copy.svg" alt="Скопировать" width={20} height={20} />
          </div>
          <span className={styles.copyLink}>Скопировать ссылку</span>
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>или</span>
          <span className={styles.dividerLine} />
        </div>

        <div className={styles.inputSection}>
          <div className={styles.inputLabelGroup}>
            <span className={styles.modalLabel}>Введи код друга</span>
            <div className={styles.inputField}>Например, ALI-1234</div>
          </div>
          <button type="button" className={styles.addBtn}>
            Добавить друга!
          </button>
        </div>
        </div>
      </div>,
      document.body,
    )

  if (empty) {
    return (
      <>
        <div className={styles.empty}>
          <div className={styles.emptyCircle}>
            <img src="assets/sad-face.svg" alt="" width={112} height={112} />
          </div>
          <div className={styles.emptyText}>
            <h2 className={styles.emptyTitle}>Пока нет друзей</h2>
            <p className={styles.emptySubtitle}>
              Пригласи друга по коду и соревнуйтесь вместе!
            </p>
          </div>
          <button type="button" className={styles.emptyBtn} onClick={() => setInviteOpen(true)}>
            Пригласить друга
          </button>
        </div>
        {modal}
      </>
    )
  }

  return (
    <>
      <div className={styles.sectionHeader}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>Друзья</h2>
          <span className={styles.countBadge}>5</span>
        </div>
        <button type="button" className={styles.inviteBtn} onClick={() => setInviteOpen(true)}>
          Пригласить друга!
        </button>
      </div>

      <div className={styles.podium}>
        {PODIUM.map((p) => (
          <div
            key={p.name}
            className={p.first ? styles.col : `${styles.col} ${styles.colSide}`}
          >
            <span className={`${styles.ring} ${p.ring}`}>
              <img src={p.avatar} alt="" />
            </span>
            <div className={styles.nameCol}>
              <span className={p.first ? `${styles.podiumName} ${styles.podiumNameFirst}` : styles.podiumName}>
                {p.name}
              </span>
              <span className={styles.podiumLevel}>{p.level}</span>
            </div>
            <span className={p.first ? `${styles.podiumXp} ${styles.podiumXpFirst}` : styles.podiumXp}>
              {p.xp}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.list}>
        {FRIENDS.map((f) => (
          <div key={f.rank} className={styles.row}>
            <div className={styles.rowLeft}>
              <span className={f.self ? `${styles.rank} ${styles.rankSelf}` : styles.rank}>
                {f.rank}
              </span>
              <img className={styles.rowAvatar} src={f.avatar} alt="" />
              <span className={styles.rowName}>{f.name}</span>
              {f.self && <span className={styles.selfTag}>Это ты!</span>}
            </div>
            <span className={styles.rowLevel}>{f.level}</span>
          </div>
        ))}
      </div>
      {modal}
    </>
  )
}
