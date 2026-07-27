import { Fragment } from 'react'
import styles from './LessonEntryScreen.module.css'

export const LESSON_HEIGHT = 1131

type LessonState = 'done' | 'active' | 'locked'

type Lesson = {
  title: string
  tag: string
  state: LessonState
}

const LESSONS: Lesson[] = [
  { title: 'Урок 1: Кухонные инструменты', tag: 'Видео', state: 'done' },
  { title: 'Урок 2: Техника безопасности', tag: 'Текст', state: 'done' },
  { title: 'Урок 3: Базовые нарезки', tag: 'Видео', state: 'active' },
  { title: 'Урок 4: Варка и тушение', tag: 'Задание', state: 'locked' },
  { title: 'Урок 5: Основные соусы', tag: 'Видео', state: 'locked' },
]

const COLLAPSED = [
  { num: 2, title: 'Завтраки и закуски', subtitle: '5 уроков · 1 тест' },
  { num: 3, title: 'Супы и горячие блюда', subtitle: '5 уроков · 1 тест' },
  { num: 4, title: 'Выпечка и десерты', subtitle: '5 уроков · 1 тест' },
  { num: 5, title: 'Праздничное меню', subtitle: '5 уроков · 1 тест' },
]

function BlockHeader({
  num,
  title,
  subtitle,
  right,
}: {
  num: number
  title: string
  subtitle: string
  right: React.ReactNode
}) {
  return (
    <div className={styles.headerRow}>
      <div className={styles.leftTitle}>
        <span className={styles.badge}>{num}</span>
        <div className={styles.titleCol}>
          <h3 className={styles.blockTitle}>{title}</h3>
          <p className={styles.blockSubtitle}>{subtitle}</p>
        </div>
      </div>
      {right}
    </div>
  )
}

function LessonRow({ lesson, onOpen }: { lesson: Lesson; onOpen?: () => void }) {
  const detailsClass =
    lesson.state === 'locked' ? `${styles.lessonDetails} ${styles.locked}` : styles.lessonDetails

  return (
    <div className={styles.lessonRow}>
      <div className={detailsClass}>
        {lesson.state === 'active' ? (
          <span className={styles.dotWrap}>
            <span className={styles.dot} />
          </span>
        ) : (
          <img
            className={styles.lessonIcon}
            src={lesson.state === 'done' ? 'assets/icon-book-check.svg' : 'assets/icon-lock.svg'}
            alt=""
          />
        )}
        <span
          className={
            lesson.state === 'active'
              ? `${styles.lessonTitle} ${styles.lessonTitleActive}`
              : styles.lessonTitle
          }
        >
          {lesson.title}
        </span>
        <span className={styles.typeTag}>{lesson.tag}</span>
      </div>

      <div className={styles.actions}>
        {lesson.state === 'done' && (
          <>
            <span className={styles.repeat}>Повторить</span>
            {/* «Пройден» открывает образовательный блок с этим уроком */}
            <button type="button" className={`${styles.pill} ${styles.pillDone}`} onClick={onOpen}>
              Пройден
            </button>
          </>
        )}
        {lesson.state === 'active' && (
          <button type="button" className={styles.cta} onClick={onOpen}>
            К уроку
          </button>
        )}
        {lesson.state === 'locked' && (
          <span className={`${styles.pill} ${styles.pillLocked}`}>Закрыт</span>
        )}
      </div>
    </div>
  )
}

export function LessonEntryScreen({ onOpenLesson }: { onOpenLesson?: () => void }) {
  return (
    <div className={styles.blocks}>
      {/* Раскрытый блок */}
      <div className={styles.card}>
        <BlockHeader
          num={1}
          title="Введение в кулинарию"
          subtitle="Базовые навыки, терминология и подготовка рабочего места"
          right={
            <div className={styles.rightStatus}>
              <span className={styles.progressText}>2 из 5 уроков</span>
              <span className={`${styles.pill} ${styles.pillProgress}`}>В процессе</span>
            </div>
          }
        />

        <hr className={styles.line} />

        {/* Строки и разделители — плоские соседи, чтобы gap 12 стоял между всеми */}
        <div className={styles.lessons}>
          {LESSONS.map((lesson, i) => (
            <Fragment key={lesson.title}>
              {i > 0 && <hr className={styles.line} />}
              <LessonRow lesson={lesson} onOpen={onOpenLesson} />
            </Fragment>
          ))}
        </div>

        <div className={styles.testBlock}>
          <div className={styles.testLeft}>
            <img className={styles.testIcon} src="assets/icon-lock.svg" alt="" />
            <div className={styles.titleCol}>
              <h4 className={styles.testTitle}>Тест по блоку 1</h4>
              <p className={styles.blockSubtitle}>Доступен после прохождения всех уроков</p>
            </div>
          </div>
          <div className={styles.rewards}>
            <span className={styles.reward}>
              <img className={styles.rewardIcon} src="assets/metric-level.svg" alt="" width={20} height={19} />
              <span className={styles.rewardText}>+ XP</span>
            </span>
            <span className={styles.reward}>
              <img className={styles.rewardIcon} src="assets/metric-health.svg" alt="" width={20} height={18} />
              <span className={styles.rewardText}>+ Питание</span>
            </span>
            <span className={styles.reward}>
              <img className={styles.rewardIcon} src="assets/reward-next.svg" alt="" width={20} height={20} />
              <span className={styles.rewardText}>Следующий блок</span>
            </span>
          </div>
        </div>
      </div>

      {/* Свёрнутые блоки */}
      {COLLAPSED.map((block) => (
        <div key={block.num} className={styles.card}>
          <BlockHeader
            num={block.num}
            title={block.title}
            subtitle={block.subtitle}
            right={<span className={`${styles.pill} ${styles.pillLocked}`}>Закрыт</span>}
          />
        </div>
      ))}
    </div>
  )
}
