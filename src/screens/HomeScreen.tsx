import styles from './HomeScreen.module.css'
import {
  DarkBannerDecor,
  OrangeBannerDecor,
  PromoBanner,
} from '../components/PromoBanner/PromoBanner'
import { StatTile } from '../components/StatTile/StatTile'
import { ProgressCard } from '../components/ProgressCard/ProgressCard'
import { FriendsCard } from '../components/FriendsCard/FriendsCard'
import { QuestCard } from '../components/QuestCard/QuestCard'
import { ContentCard } from '../components/ContentCard/ContentCard'

export const HOME_HEIGHT = 1899

const TILES = [
  {
    title: 'Новые уроки',
    badge: '10',
    icon: 'assets/tile-icon-lessons.svg',
    illustration: 'assets/tile-ill-lessons.png',
    iconShadow: 'rgba(65, 137, 255, 0.08)',
    illustrationStyle: { left: 280, top: 86, width: 117, height: 81 },
  },
  {
    title: 'Челлендж',
    badge: '2 дня',
    icon: 'assets/tile-icon-challenge.svg',
    illustration: 'assets/tile-ill-challenge.png',
    iconShadow: 'rgba(255, 161, 0, 0.08)',
    illustrationStyle: { left: 274.31, top: 79.31, width: 120, height: 128 },
  },
  {
    title: 'Друзья',
    badge: '15',
    icon: 'assets/tile-icon-friends.svg',
    illustration: 'assets/tile-ill-friends.png',
    iconShadow: 'rgba(91, 89, 215, 0.08)',
    illustrationStyle: { left: 278.73, top: 89, width: 114, height: 118 },
  },
  {
    title: 'Мини-игра',
    badge: 'Новая!',
    icon: 'assets/tile-icon-game.svg',
    illustration: 'assets/tile-ill-game.png',
    iconShadow: 'rgba(255, 92, 92, 0.08)',
    illustrationStyle: { left: 263, top: 79, width: 116, height: 97 },
  },
]

const CONTENT_CARDS = [
  { title: 'Секреты здоровой еды', duration: '10 минут', kind: 'Видео' },
  { title: 'Секреты здоровой еды', duration: '10 минут', kind: 'Статья' },
  { title: 'Секреты здоровой еды', duration: '10 минут', kind: 'Видео' },
]

export function HomeScreen({
  onOpenFriends,
  onOpenGame,
  onOpenLessons,
  onOpenChallenge,
  onStartLesson,
}: {
  onOpenFriends?: () => void
  onOpenGame?: () => void
  /** «Новые уроки» → Мои курсы */
  onOpenLessons?: () => void
  /** «Челлендж» → экран теста */
  onOpenChallenge?: () => void
  /** «Начать занятие!» в карточке прогресса → экран теста */
  onStartLesson?: () => void
}) {
  return (
    <>
      <div className={styles.frame}>
        <div className={styles.topRow}>
          <PromoBanner
            variant="orange"
            title="Готовим вместе!"
            description="Присоединяйтесь к онлайн-классу по кулинарии с известным шеф-поваром Антоном Беловым и изучи базовые навыки при готовке еды!"
            action="Присоединиться"
            descriptionWidth={338}
          >
            <OrangeBannerDecor />
          </PromoBanner>
          <PromoBanner
            variant="dark"
            title="Технологии в готовке!"
            description="Откройте для себя мир кулинарных технологий с экспертом Петром Ивановым и узнайте, как инновации меняют способы приготовления пищи!"
            action="Смотреть сейчас"
            descriptionWidth={370}
          >
            <DarkBannerDecor />
          </PromoBanner>
        </div>

        <div className={styles.grid}>
          <StatTile {...TILES[0]} onClick={onOpenLessons} />
          <StatTile {...TILES[1]} onClick={onOpenChallenge} />
          <ProgressCard onStart={onStartLesson} />
          <StatTile {...TILES[2]} onClick={onOpenFriends} />
          <StatTile {...TILES[3]} onClick={onOpenGame} />
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.questRow}>
        <QuestCard />
        <FriendsCard />
      </div>

      <hr className={styles.divider} />

      <div className={styles.bottomRow}>
        {CONTENT_CARDS.map((card, i) => (
          <ContentCard key={i} {...card} />
        ))}
      </div>
    </>
  )
}
