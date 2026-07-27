import { useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './SettingsScreen.module.css'
import type { Tab } from '../components/Sidebar/Sidebar'
import { useScale } from '../ScaleContext'

export const SETTINGS_HEIGHT = 1240

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className={on ? `${styles.toggle} ${styles.toggleOn}` : styles.toggle}
      onClick={onToggle}
      aria-pressed={on}
    >
      <span className={styles.knob} />
    </button>
  )
}

function SettingRow({
  title,
  sub,
  on,
  onToggle,
}: {
  title: string
  sub: string
  on: boolean
  onToggle: () => void
}) {
  return (
    <div className={styles.settingRow}>
      <div className={styles.settingText}>
        <span className={styles.settingTitle}>{title}</span>
        <span className={styles.settingSub}>{sub}</span>
      </div>
      <Toggle on={on} onToggle={onToggle} />
    </div>
  )
}

const OWL = 'assets/avatar-owl.png'
const HEDGEHOG = 'assets/avatar-hedgehog.png'
// Порядок сетки аватаров из макета (сова / ёжики), по 4 в ряд
const AVATARS = [OWL, HEDGEHOG, HEDGEHOG, HEDGEHOG, OWL, HEDGEHOG, HEDGEHOG, HEDGEHOG]

export function SettingsScreen({ onNavigate }: { onNavigate?: (tab: Tab) => void }) {
  const [notifications, setNotifications] = useState(true)
  const [reminders, setReminders] = useState(true)
  const [sound, setSound] = useState(true)

  // #settings-avatar / #settings-logout открывают модалки сразу (дип-линк и снимок)
  const [avatarModal, setAvatarModal] = useState(
    () => window.location.hash === '#settings-avatar',
  )
  const [logoutModal, setLogoutModal] = useState(
    () => window.location.hash === '#settings-logout',
  )
  const [chosen, setChosen] = useState(1)
  const scale = useScale()

  return (
    <div className={styles.screen}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.titleCol}>
            <h1 className={styles.title}>Настройки</h1>
            <p className={styles.subtitle}>Управляй своим профилем</p>
          </div>
          <div className={styles.icons}>
            <button type="button" className={styles.iconBtn}>
              <img src="assets/icon-notification.svg" alt="Уведомления" width={40} height={40} />
            </button>
            <button type="button" className={styles.iconBtn}>
              <img src="assets/icon-settings-active.svg" alt="Настройки" width={40} height={40} />
            </button>
          </div>
        </div>

        <div className={styles.sections}>
          {/* Профиль */}
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Профиль</h2>
            <div className={styles.avatarRow}>
              <div className={styles.avatarLeft}>
                <img className={styles.avatar} src="assets/avatar.png" alt="" />
                <div className={styles.userMeta}>
                  <span className={styles.userName}>Ваня Иванов</span>
                  <span className={styles.userSub}>Ученик · Уровень 4</span>
                </div>
              </div>
              <button
                type="button"
                className={styles.avatarBtn}
                onClick={() => setAvatarModal(true)}
              >
                Изменить аватар
              </button>
            </div>

            <hr className={styles.line} />

            <div className={styles.field}>
              <span className={styles.fieldLabel}>Отображаемое имя</span>
              <div className={styles.input}>
                <span>Ваня Иванов</span>
                <img src="assets/icon-pencil.svg" alt="" width={16} height={16} />
              </div>
            </div>

            <div className={styles.row}>
              <span className={styles.rowLabel}>Роль</span>
              <span className={styles.rowValue}>Ученик</span>
            </div>

            <div className={styles.row}>
              <span className={styles.rowLabel}>Уровень</span>
              <span className={`${styles.rowValue} ${styles.rowValueStrong}`}>Уровень 4</span>
            </div>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>Твой код для друзей</span>
              <div className={styles.codeField}>
                <span>VANYA-2847</span>
                <img src="assets/icon-copy.svg" alt="Скопировать" width={20} height={20} />
              </div>
            </div>
          </section>

          {/* Уведомления */}
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Уведомления</h2>
            <SettingRow
              title="Уведомления"
              sub="Квесты, челленджи, заявки в друзья"
              on={notifications}
              onToggle={() => setNotifications((v) => !v)}
            />
            <SettingRow
              title="Напоминания"
              sub="Ежедневные сообщения с напоминанием"
              on={reminders}
              onToggle={() => setReminders((v) => !v)}
            />
          </section>

          {/* Звук */}
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Звук</h2>
            <SettingRow
              title="Звуки в уроках и мини-игре"
              sub="Звуковые эффекты и фоновая музыка"
              on={sound}
              onToggle={() => setSound((v) => !v)}
            />
          </section>

          {/* Аккаунт */}
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Аккаунт</h2>
            <button
              type="button"
              className={styles.accountRow}
              onClick={() => onNavigate?.('support')}
            >
              <span className={styles.accountLabel}>Поддержка</span>
              <img src="assets/icon-chevron-right.svg" alt="" width={20} height={20} />
            </button>
            <button type="button" className={styles.accountRow}>
              <span className={styles.accountLabel}>Удалить аккаунт</span>
              <img src="assets/icon-chevron-right.svg" alt="" width={20} height={20} />
            </button>
            <button type="button" className={styles.accountRow}>
              <span className={styles.accountLabel}>Политика и условия</span>
              <img src="assets/icon-chevron-right.svg" alt="" width={20} height={20} />
            </button>
            <hr className={styles.line} />
            <button
              type="button"
              className={styles.logout}
              onClick={() => setLogoutModal(true)}
            >
              <img src="assets/icon-logout.svg" alt="" width={20} height={20} />
              <span className={styles.logoutText}>Выйти из аккаунта</span>
            </button>
          </section>
        </div>
      </div>

      {avatarModal &&
        createPortal(
          <div className={styles.backdrop} onClick={() => setAvatarModal(false)}>
            <div
              className={styles.modal}
              style={{ transform: `scale(${scale})` }}
              onClick={(e) => e.stopPropagation()}
            >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Выбери аватар</h3>
              <button
                type="button"
                className={styles.modalClose}
                onClick={() => setAvatarModal(false)}
              >
                <img src="assets/icon-close.svg" alt="Закрыть" width={16} height={16} />
              </button>
            </div>

            <div className={styles.avatarGrid}>
              {[0, 1].map((rowIdx) => (
                <div key={rowIdx} className={styles.modalAvatarRow}>
                  {AVATARS.slice(rowIdx * 4, rowIdx * 4 + 4).map((src, i) => {
                    const index = rowIdx * 4 + i
                    return (
                      <button
                        key={index}
                        type="button"
                        className={
                          index === chosen
                            ? `${styles.avatarOption} ${styles.avatarSelected}`
                            : styles.avatarOption
                        }
                        style={{ backgroundImage: `url(${src})` }}
                        onClick={() => setChosen(index)}
                        aria-label={`Аватар ${index + 1}`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>

              <button type="button" className={styles.saveBtn} onClick={() => setAvatarModal(false)}>
                Сохранить
              </button>
            </div>
          </div>,
          document.body,
        )}

      {logoutModal &&
        createPortal(
          <div className={styles.backdrop} onClick={() => setLogoutModal(false)}>
            <div
              className={styles.dialog}
              style={{ transform: `scale(${scale})` }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.dialogText}>
                <h3 className={styles.dialogTitle}>Выйти из аккаунта</h3>
                <p className={styles.dialogSub}>Ты сможешь вернуться в любое время</p>
              </div>
              <div className={styles.dialogButtons}>
              <button
                type="button"
                className={styles.dialogStay}
                onClick={() => setLogoutModal(false)}
              >
                Остаться
              </button>
              <button
                type="button"
                className={styles.dialogLeave}
                onClick={() => {
                  setLogoutModal(false)
                  onNavigate?.('home')
                }}
              >
                Выйти
              </button>
            </div>
          </div>
        </div>,
          document.body,
        )}
    </div>
  )
}
