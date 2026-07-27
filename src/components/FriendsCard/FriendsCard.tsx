import styles from './FriendsCard.module.css'

type Friend = {
  rank: string
  name: string
  level: string
  highlighted?: boolean
}

const FRIENDS: Friend[] = [
  { rank: '🥇', name: 'Али', level: 'Уровень 7', highlighted: true },
  { rank: '🥈', name: 'Фатима', level: 'Уровень 6' },
  { rank: '🥉', name: 'Алина', level: 'Уровень 5' },
  { rank: '4.', name: 'Патахъ', level: 'Уровень 5' },
  { rank: '5.', name: 'Мага', level: 'Уровень 4' },
]

export function FriendsCard({ onInvite }: { onInvite?: () => void }) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Твои друзья</h2>

      <div className={styles.list}>
        {FRIENDS.map((friend) => (
          <div
            key={friend.name}
            className={friend.highlighted ? `${styles.row} ${styles.rowFirst}` : styles.row}
          >
            <div className={styles.person}>
              <span
                className={
                  friend.rank.endsWith('.') ? `${styles.rank} ${styles.rankNumber}` : styles.rank
                }
              >
                {friend.rank}
              </span>
              <span className={styles.name}>{friend.name}</span>
            </div>
            <span className={styles.level}>{friend.level}</span>
          </div>
        ))}
      </div>

      <button type="button" className={styles.invite} onClick={onInvite}>
        Пригласить друга!
      </button>
    </section>
  )
}
