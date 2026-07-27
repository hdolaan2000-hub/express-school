import styles from './auth.module.css'

export const REGISTER_HEIGHT = 900

export function RegisterScreen({
  onCreate,
  onLogin,
}: {
  onCreate?: () => void
  onLogin?: () => void
}) {
  return (
    <div className={styles.screen}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img src="assets/logo.svg" alt="" width={23} height={25} />
          <span className={styles.logoText}>Экспресс Школа</span>
        </div>
        <img className={styles.illustration} src="assets/login-illustration.png" alt="" />
      </div>

      <div className={`${styles.right} ${styles.rightCompact}`}>
        <div className={styles.form}>
          <div className={`${styles.headerText} ${styles.headerTight}`}>
            <h1 className={styles.title}>Регистрация</h1>
            <p className={styles.subtitle}>Создай аккаунт и начни учиться!</p>
          </div>

          <div className={`${styles.inputs} ${styles.inputsTight}`}>
            <div className={styles.field}>
              <span className={styles.label}>Как тебя зовут?</span>
              <div className={styles.input}>
                <img src="assets/icon-user.svg" alt="" width={20} height={20} />
                <span className={styles.inputText}>Например, Ваня</span>
              </div>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>Электронная почта</span>
              <div className={styles.input}>
                <img src="assets/icon-mail.svg" alt="" width={20} height={20} />
                <span className={styles.inputText}>name@school.ru</span>
              </div>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>Придумай пароль</span>
              <div className={styles.input}>
                <img src="assets/icon-lock-input.svg" alt="" width={20} height={20} />
                <span className={styles.inputText}>Минимум 6 символов</span>
                <img
                  className={styles.eye}
                  src="assets/icon-eye.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>Повтори пароль</span>
              <div className={styles.input}>
                <img src="assets/icon-lock-input.svg" alt="" width={20} height={20} />
                <span className={styles.inputText}>••••••••</span>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.submit} onClick={onCreate}>
              Создать аккаунт
            </button>
            <div className={styles.switch}>
              <span className={styles.switchMuted}>Уже есть аккаунт?</span>
              <button type="button" className={styles.switchLink} onClick={onLogin}>
                Войти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
