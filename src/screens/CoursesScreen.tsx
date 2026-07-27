import styles from './CoursesScreen.module.css'
import { CourseCard, type CourseTheme } from '../components/CourseCard/CourseCard'
import { useDragScroll } from '../hooks/useDragScroll'

export const COURSES_HEIGHT = 1256

type Course = {
  icon: string
  tag: string
  theme: CourseTheme
  active?: boolean
}

const TITLE = 'Название курса можно делать две строки'
const SUBTITLE = 'Например, 1 месяц'

const ACTIVE: Course[] = [
  { icon: 'assets/course-cook-1.png', tag: 'Кулинария', theme: 'cooking', active: true },
  { icon: 'assets/course-cook-2.png', tag: 'Кулинария', theme: 'cooking', active: true },
]

const PROGRAMMING: Course[] = [
  { icon: 'assets/course-tech-1.png', tag: 'Технологии', theme: 'tech' },
  { icon: 'assets/course-tech-2.png', tag: 'Технологии', theme: 'tech' },
]

const HEALTH: Course[] = [
  { icon: 'assets/course-health-1.png', tag: 'Основы безопасности', theme: 'health' },
  { icon: 'assets/course-health-2.png', tag: 'Основы безопасности', theme: 'health' },
]

function Row({ courses, onStart }: { courses: Course[]; onStart?: () => void }) {
  const ref = useDragScroll<HTMLDivElement>()
  return (
    <div className={styles.row} ref={ref}>
      {courses.map((course, i) => (
        <CourseCard
          key={i}
          {...course}
          title={TITLE}
          subtitle={SUBTITLE}
          onStart={course.active ? onStart : undefined}
        />
      ))}
    </div>
  )
}

export function CoursesScreen({ onStartLesson }: { onStartLesson?: () => void }) {
  return (
    <>
      <Row courses={ACTIVE} onStart={onStartLesson} />

      <hr className={styles.divider} />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Программирование</h2>
        <Row courses={PROGRAMMING} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Здоровье</h2>
        <Row courses={HEALTH} />
      </section>
    </>
  )
}
