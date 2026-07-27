import styles from './EduLessonScreen.module.css'
import type { Tab } from '../components/Sidebar/Sidebar'

export const EDU_HEIGHT = 1964

const BULLETS = [
  'Всегда режьте на разделочной доске',
  'Движение ножа — от себя, не к себе',
  'Пальцы свободной руки согнуты внутрь',
  'После использования сразу мойте и убирайте',
]

export function EduLessonScreen({
  onBack,
  onStartTest,
}: {
  onBack?: (tab: Tab) => void
  onStartTest?: () => void
}) {
  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <div className={styles.leftGroup}>
          <button type="button" className={styles.backBtn} onClick={() => onBack?.('courses')}>
            <img src="assets/icon-back.svg" alt="Назад" width={40} height={40} />
          </button>
          <span className={styles.backText}>Назад</span>
        </div>

        <span className={styles.title}>Урок 1: Кухонные инструменты</span>

        <div className={styles.xpPill}>
          <img src="assets/icon-bolt-white.svg" alt="" width={14} height={20} />
          <span>25 / 25</span>
        </div>
      </div>

      <div className={styles.content}>
        <article className={styles.article}>
          <h1 className={styles.h1}>Основные инструменты на кухне</h1>
          <p className={styles.paragraph}>
            Каждый повар начинает с правильных инструментов. На вашей кухне обязательно должны быть:
            острый нож, разделочная доска, набор кастрюль и сковородок разного размера. Хорошие
            инструменты — это половина успеха в приготовлении вкусных блюд!
          </p>

          <figure className={styles.imageBlock}>
            <img className={styles.photo} src="assets/edu-photo.png" alt="" />
            <figcaption className={styles.caption}>
              Базовый набор инструментов для начинающего повара
            </figcaption>
          </figure>

          <div className={styles.h2Section}>
            <hr className={styles.divider} />
            <h2 className={styles.h2}>Как правильно держать нож</h2>
          </div>

          <p className={styles.paragraph}>
            Правильный хват ножа — основа безопасной работы на кухне. Держите нож за рукоятку,
            обхватив её всеми пальцами. Указательный палец и большой палец должны находиться на
            лезвии для лучшего контроля. Это даёт точность и снижает усталость руки.
          </p>

          <ul className={styles.bullets}>
            {BULLETS.map((item) => (
              <li key={item} className={styles.bulletItem}>
                <span className={styles.bulletIcon}>
                  <img src="assets/bullet-dot.svg" alt="" width={16} height={16} />
                </span>
                <span className={styles.bulletText}>{item}</span>
              </li>
            ))}
          </ul>

          <figure className={styles.videoBlock}>
            <div
              className={styles.videoFrame}
              style={{ backgroundImage: 'url(assets/edu-video.png)' }}
            >
              <span className={styles.playButton}>
                <span className={styles.playTriangle} />
              </span>
            </div>
            <figcaption className={styles.caption}>
              Видео: техника безопасного хвата ножа (2:30)
            </figcaption>
          </figure>

          <div className={styles.factBlock}>
            <h3 className={styles.factTitle}>Интересный факт</h3>
            <p className={styles.factText}>
              Профессиональные повара затачивают свои ножи каждый день! Острый нож безопаснее тупого,
              потому что требует меньше усилий при нарезке.
            </p>
          </div>

          <div className={styles.spacer} />

          <div className={styles.cta}>
            <button type="button" className={styles.ctaButton} onClick={onStartTest}>
              Пройти тест по уроку!
            </button>
            <span className={styles.ctaHint}>Вас ждут 6 вопросов по материалу</span>
          </div>
        </article>
      </div>
    </div>
  )
}
