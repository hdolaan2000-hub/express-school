import styles from './Sidebar.module.css'
import { useScale } from '../../ScaleContext'

/** Вкладки, у которых есть свой экран. Остальные пункты меню пока неактивны. */
export type Tab =
  | 'login'
  | 'register'
  | 'forgot'
  | 'reset'
  | 'home'
  | 'friends'
  | 'courses'
  | 'lesson'
  | 'edu'
  | 'quiz'
  | 'game'
  | 'support'
  | 'settings'
  | 'complete'

/** Какой пункт меню подсвечивать для каждого экрана. Урок — часть «Моих курсов»;
    квиз и друзья — переходы без активного пункта. */
const MENU_FOR: Record<Tab, Tab | null> = {
  login: null,
  register: null,
  forgot: null,
  reset: null,
  home: 'home',
  friends: null,
  courses: 'courses',
  lesson: 'courses',
  edu: 'edu',
  quiz: null,
  game: null,
  support: 'support',
  settings: null,
  complete: 'home',
}

type MenuItem = { icon: string; label: string; tab?: Tab }

const MENU: MenuItem[] = [
  { icon: 'menu-home.svg', label: 'Главная', tab: 'home' },
  { icon: 'menu-basket.svg', label: 'Мои курсы', tab: 'courses' },
  { icon: 'menu-blocks.svg', label: 'Образовательные блоки', tab: 'edu' },
  { icon: 'menu-support.svg', label: 'Поддержка', tab: 'support' },
]

type Props = {
  active: Tab
  onNavigate: (tab: Tab) => void
}

export function Sidebar({ active, onNavigate }: Props) {
  const scale = useScale()
  // Сайдбар живёт вне масштабируемой сцены и крепится к окну, поэтому при
  // скролле остаётся на месте, а серый фон всегда во всю высоту окна.
  return (
    <aside
      className={styles.sidebar}
      style={{ width: 250 * scale }}
    >
      <div
        className={styles.inner}
        style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
      <div className={styles.logo}>
        <div className={styles.logoInner}>
          <img src="assets/logo.svg" alt="" width={23} height={25} />
          <span className={styles.logoText}>Школа ЭП</span>
        </div>
      </div>

      <nav className={styles.menu}>
        {MENU.map((item) => {
          const isActive = item.tab === MENU_FOR[active]
          return (
            <button
              key={item.label}
              type="button"
              className={isActive ? `${styles.item} ${styles.itemActive}` : styles.item}
              onClick={item.tab ? () => onNavigate(item.tab!) : undefined}
            >
              <span className={styles.itemInner}>
                {/* Иконку красим маской, а не цветом из файла: активный пункт
                    оранжевый, остальные серые — как в макете. */}
                <span
                  className={styles.itemIcon}
                  style={
                    {
                      WebkitMaskImage: `url(assets/${item.icon})`,
                      maskImage: `url(assets/${item.icon})`,
                    } as React.CSSProperties
                  }
                />
                <span className={styles.itemLabel}>{item.label}</span>
              </span>
            </button>
          )
        })}
      </nav>
      </div>
    </aside>
  )
}
