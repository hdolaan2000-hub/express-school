import { useEffect, useRef, useState } from 'react'
import styles from './App.module.css'
import { useStageScale } from './hooks/useStageScale'
import { ScaleContext } from './ScaleContext'
import { Sidebar, type Tab } from './components/Sidebar/Sidebar'
import { UserCard } from './components/UserCard/UserCard'
import { HomeScreen, HOME_HEIGHT } from './screens/HomeScreen'
import { CoursesScreen, COURSES_HEIGHT } from './screens/CoursesScreen'
import { LessonEntryScreen, LESSON_HEIGHT } from './screens/LessonEntryScreen'
import { EduLessonScreen, EDU_HEIGHT } from './screens/EduLessonScreen'
import { QuizScreen, QUIZ_HEIGHT } from './screens/QuizScreen'
import { FriendsScreen, FRIENDS_HEIGHT } from './screens/FriendsScreen'
import { SupportScreen, SUPPORT_HEIGHT } from './screens/SupportScreen'
import { SettingsScreen, SETTINGS_HEIGHT } from './screens/SettingsScreen'
import { LessonCompleteScreen, COMPLETE_HEIGHT } from './screens/LessonCompleteScreen'
import { MemoryGameScreen, GAME_HEIGHT } from './screens/MemoryGameScreen'
import { LoginScreen, LOGIN_HEIGHT } from './screens/LoginScreen'
import { RegisterScreen, REGISTER_HEIGHT } from './screens/RegisterScreen'
import { ForgotPasswordScreen, FORGOT_HEIGHT } from './screens/ForgotPasswordScreen'
import { ResetPasswordScreen, RESET_HEIGHT } from './screens/ResetPasswordScreen'

const STAGE_WIDTH = 1440
const SIDEBAR_WIDTH = 250
/** Ширина блока контента — фиксированная во всех макетах */
const CONTENT_WIDTH = 1158

const GREETING_TITLE = '👋🏻  Привет, Мага'

type ScreenConfig = {
  height: number
  /** 'standard' — сайдбар + центрированный контент с шапкой; 'full' — своя раскладка на всю ширину */
  layout?: 'standard' | 'full'
  title?: string
  subtitle?: React.ReactNode
  /** hash передаём явно: экраны с состояниями (модалки, ошибка в тесте)
      инициализируются из него, а key заставляет их пересобраться при смене.
      nav принимает необязательный hashOverride для перехода в конкретное состояние.
      back — возврат на предыдущий экран (откуда пришли). */
  render: (
    nav: (tab: Tab, hashOverride?: string) => void,
    hash: string,
    back: () => void,
  ) => React.ReactNode
}

const SCREENS: Record<Tab, ScreenConfig> = {
  home: {
    height: HOME_HEIGHT,
    title: GREETING_TITLE,
    subtitle: (
      <>
        Сегодня осталось <strong className={styles.greetingAccent}>45 минут</strong> до окончания
        квеста!
      </>
    ),
    render: (nav) => (
      <HomeScreen
        onOpenFriends={() => nav('friends')}
        onInviteFriend={() => nav('friends', 'friends-invite')}
        onOpenGame={() => nav('game')}
        onOpenLessons={() => nav('courses')}
        onOpenChallenge={() => nav('quiz')}
        onStartLesson={() => nav('quiz')}
      />
    ),
  },
  friends: {
    height: FRIENDS_HEIGHT,
    title: GREETING_TITLE,
    subtitle: (
      <>
        У тебя <strong className={styles.greetingAccent}>5 друзей</strong>!
      </>
    ),
    render: () => <FriendsScreen />,
  },
  courses: {
    height: COURSES_HEIGHT,
    title: GREETING_TITLE,
    subtitle: (
      <>
        У тебя активно <strong className={styles.greetingAccent}>2 курса</strong>!
      </>
    ),
    render: (nav) => <CoursesScreen onStartLesson={() => nav('lesson')} />,
  },
  lesson: {
    height: LESSON_HEIGHT,
    title: 'Основы кулинарии',
    subtitle: <>10 блоков · 45 уроков · ~12 часов</>,
    render: (nav) => <LessonEntryScreen onOpenLesson={() => nav('edu')} />,
  },
  edu: {
    height: EDU_HEIGHT,
    layout: 'full',
    render: (nav, _hash, back) => (
      <EduLessonScreen onBack={back} onStartTest={() => nav('quiz')} />
    ),
  },
  quiz: {
    height: QUIZ_HEIGHT,
    layout: 'full',
    render: (nav, hash) => (
      <QuizScreen key={hash} onClose={nav} mistake={hash === '#quiz-mistake'} />
    ),
  },
  game: {
    height: GAME_HEIGHT,
    layout: 'full',
    render: (nav) => <MemoryGameScreen onExit={() => nav('home')} />,
  },
  support: {
    height: SUPPORT_HEIGHT,
    title: GREETING_TITLE,
    subtitle: <>Чем можем помочь?</>,
    render: () => <SupportScreen />,
  },
  settings: {
    height: SETTINGS_HEIGHT,
    layout: 'full',
    render: (nav, hash) => <SettingsScreen key={hash} onNavigate={nav} />,
  },
  complete: {
    height: COMPLETE_HEIGHT,
    layout: 'full',
    render: (nav, hash) => (
      <LessonCompleteScreen key={hash} onNavigate={nav} levelUp={hash === '#complete-levelup'} />
    ),
  },
  login: {
    height: LOGIN_HEIGHT,
    layout: 'full',
    render: (nav, hash) => (
      <LoginScreen
        key={hash}
        onLogin={() => nav('home')}
        onRegister={() => nav('register')}
        onForgot={() => nav('forgot')}
        error={hash === '#login-error'}
      />
    ),
  },
  register: {
    height: REGISTER_HEIGHT,
    layout: 'full',
    render: (nav) => (
      <RegisterScreen onCreate={() => nav('home')} onLogin={() => nav('login')} />
    ),
  },
  forgot: {
    height: FORGOT_HEIGHT,
    layout: 'full',
    render: (nav) => (
      <ForgotPasswordScreen onBack={() => nav('login')} onSubmit={() => nav('reset')} />
    ),
  },
  reset: {
    height: RESET_HEIGHT,
    layout: 'full',
    render: (nav) => (
      <ResetPasswordScreen onBack={() => nav('login')} onSave={() => nav('login')} />
    ),
  },
}

const HASH: Record<Tab, string> = {
  login: '', // экран входа — стартовый (пустой хэш)
  register: 'register',
  forgot: 'forgot',
  reset: 'reset',
  home: 'home',
  friends: 'friends',
  courses: 'courses',
  lesson: 'lesson',
  edu: 'edu',
  quiz: 'quiz',
  game: 'game',
  support: 'support',
  settings: 'settings',
  complete: 'complete',
}
const TABS: Tab[] = [
  'home',
  'login',
  'register',
  'forgot',
  'reset',
  'friends',
  'courses',
  'lesson',
  'edu',
  'quiz',
  'game',
  'support',
  'settings',
  'complete',
]

/** Экраны авторизации — без сайдбара и карточки пользователя, во всю ширину */
const AUTH_TABS: Tab[] = ['login', 'register', 'forgot', 'reset']
const isAuth = (t: Tab) => AUTH_TABS.includes(t)

function initialTab(): Tab {
  const hash = window.location.hash.replace('#', '')
  // друзья с открытой модалкой / пустым состоянием — тот же таб
  if (hash === 'friends-invite' || hash === 'friends-empty') return 'friends'
  // настройки с модалками (аватар / выход)
  if (hash === 'settings-avatar' || hash === 'settings-logout') return 'settings'
  if (hash === 'complete-levelup') return 'complete' // завершение с баннером уровня
  if (hash === 'quiz-mistake') return 'quiz' // тест с выбранным неверным ответом
  if (hash === 'login-error') return 'login' // вход с ошибкой «неверный пароль»
  // пустой/неизвестный хэш — экран входа (стартовый)
  return TABS.includes(hash as Tab) ? (hash as Tab) : 'login'
}

export default function App() {
  const [tab, setTab] = useState<Tab>(initialTab)
  const [hash, setHash] = useState(() => window.location.hash)
  // Экран, с которого пришли — чтобы кнопка «назад» возвращала туда, а не
  // всегда на один и тот же экран.
  const prevTabRef = useRef<Tab>('home')
  const stage = useStageScale(STAGE_WIDTH)

  // Синхронизируем экран с адресом: работает кнопка «Назад» в браузере
  // и ручная правка хэша, а не только первая загрузка.
  useEffect(() => {
    const onHashChange = () => {
      setTab(initialTab())
      setHash(window.location.hash)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  const screen = SCREENS[tab]

  // Пустое состояние друзей — тот же экран, но выше (900) и с другим содержимым
  const friendsEmpty = tab === 'friends' && hash === '#friends-empty'
  const stageHeight = friendsEmpty ? 900 : screen.height
  const subtitle = friendsEmpty ? (
    <>
      У тебя пока что <strong className={styles.greetingAccent}>нет друзей</strong>!
    </>
  ) : (
    screen.subtitle
  )

  // Требование дизайнера: секции плавно затухают и появляются при смене страницы.
  // Сначала фейд-аут текущего контента, затем подмена экрана и фейд-ин нового.
  const [visible, setVisible] = useState(true)
  const FADE_MS = 150

  // hashOverride — для переходов в конкретное состояние экрана (например,
  // друзья сразу с открытой модалкой приглашения: '#friends-invite').
  const navigate = (next: Tab, hashOverride?: string) => {
    const nextHash = hashOverride ?? HASH[next]
    if (next === tab && !friendsEmpty && `#${nextHash}` === window.location.hash) return
    if (next !== tab) prevTabRef.current = tab // запоминаем, откуда уходим
    setVisible(false) // фейд-аут текущего
    window.setTimeout(() => {
      setTab(next) // подменяем экран, пока он ещё прозрачный
      window.location.hash = nextHash
      setHash(window.location.hash)
      window.scrollTo(0, 0)
      // включаем видимость на следующем кадре, чтобы сработал фейд-ин из 0 в 1
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    }, FADE_MS)
  }

  // Возврат на предыдущий экран (откуда пришли на текущий)
  const goBack = () => navigate(prevTabRef.current)

  const fadeStyle = {
    opacity: visible ? 1 : 0,
    transition: `opacity ${FADE_MS}ms ease`,
  }

  // Блок контента центрируется в пространстве справа от сайдбара.
  // На 1440 это даёт отступ 16px — ровно как в исходном макете.
  const contentLeft = SIDEBAR_WIDTH + (stage.width - SIDEBAR_WIDTH - CONTENT_WIDTH) / 2

  return (
    <ScaleContext.Provider value={stage.scale}>
      <div
        className={styles.viewport}
        style={{ width: stage.width * stage.scale, height: stageHeight * stage.scale }}
      >
        <div
          className={styles.stage}
          style={{
            transform: `scale(${stage.scale})`,
            width: stage.width,
            height: stageHeight,
          }}
        >
          {isAuth(tab) ? (
            // экраны авторизации — без сайдбара, на всю ширину
            <div className={styles.workArea} style={{ left: 0, width: stage.width, ...fadeStyle }}>
              {screen.render(navigate, hash, goBack)}
            </div>
          ) : (
            <>
        {screen.layout === 'full' ? (
          <div
            className={styles.workArea}
            style={{ left: SIDEBAR_WIDTH, width: stage.width - SIDEBAR_WIDTH, ...fadeStyle }}
          >
            {screen.render(navigate, hash, goBack)}
          </div>
        ) : (
          <div
            className={styles.content}
            style={
              {
                left: contentLeft,
                // запас справа до края экрана — для рядов курсов, которые
                // выходят за пределы 1158 и скроллятся до границы окна
                '--right-space': `${stage.width - contentLeft - CONTENT_WIDTH}px`,
                ...fadeStyle,
              } as React.CSSProperties
            }
          >
            <header className={styles.header}>
              <div className={styles.greeting}>
                <h1 className={styles.greetingTitle}>{screen.title}</h1>
                <p className={styles.greetingSubtitle}>{subtitle}</p>
              </div>
              <div className={styles.icons}>
                <button type="button" className={styles.iconButton}>
                  <img src="assets/icon-notification.svg" alt="Уведомления" width={40} height={40} />
                </button>
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => navigate('settings')}
                >
                  <img src="assets/icon-settings.svg" alt="Настройки" width={40} height={40} />
                </button>
              </div>
            </header>

            <div className={styles.stack}>
              {tab === 'friends' ? (
                <FriendsScreen key={hash} empty={friendsEmpty} />
              ) : (
                screen.render(navigate, hash, goBack)
              )}
            </div>
          </div>
        )}
            </>
          )}
        </div>
      </div>

      {/* Сайдбар и карточка пользователя — вне масштабируемой сцены, прикреплены
          к окну: при скролле остаются на месте, серый фон всегда во всю высоту.
          На экранах авторизации их не показываем. */}
      {!isAuth(tab) && (
        <>
          <Sidebar active={tab} onNavigate={navigate} />
          <UserCard onOpen={() => navigate('settings')} />
        </>
      )}
    </ScaleContext.Provider>
  )
}
