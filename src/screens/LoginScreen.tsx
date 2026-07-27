import styles from './auth.module.css'

export const LOGIN_HEIGHT = 900

export function LoginScreen({
  onLogin,
  onRegister,
  onForgot,
  error,
}: {
  onLogin?: () => void
  onRegister?: () => void
  onForgot?: () => void
  /** Состояние «неверный пароль»: красная рамка и сообщение об ошибке */
  error?: boolean
}) {
  return (
    <div className={styles.screen}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img src="assets/logo.svg" alt="" width={23} height={25} />
          <span className={styles.logoText}>Школа ЭП</span>
        </div>
        <img className={styles.illustration} src="assets/login-illustration.png" alt="" />
      </div>

      <div className={styles.right}>
        <div className={styles.form}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>Вход</h1>
            <p className={styles.subtitle}>Рады видеть тебя снова!</p>
          </div>

          <div className={styles.inputs}>
            <div className={styles.field}>
              <span className={styles.label}>Электронная почта</span>
              <div className={styles.input}>
                <img src="assets/icon-mail.svg" alt="" width={20} height={20} />
                <span className={styles.inputText}>{error ? 'vanya@school.ru' : 'name@school.ru'}</span>
              </div>
            </div>

            <div className={styles.passwordGroup}>
              <div className={styles.field}>
                <span className={styles.label}>Пароль</span>
                <div className={error ? `${styles.input} ${styles.inputError}` : styles.input}>
                  <img src="assets/icon-lock-input.svg" alt="" width={20} height={20} />
                  <span className={styles.inputText}>••••••••</span>
                  <img className={styles.eye} src="assets/icon-eye.svg" alt="" width={20} height={20} />
                </div>
                {error && (
                  <span className={styles.errorMsg}>Неверный пароль. Попробуйте ещё раз</span>
                )}
              </div>
              <button type="button" className={styles.forgot} onClick={onForgot}>
                Забыли пароль?
              </button>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.submit} onClick={onLogin}>
              Войти
            </button>
            <div className={styles.divider}>
              <span className={styles.dividerLine} />
              <span className={styles.dividerText}>или</span>
              <span className={styles.dividerLine} />
            </div>
            <div className={styles.switch}>
              <span className={styles.switchMuted}>Нет аккаунта?</span>
              <button type="button" className={styles.switchLink} onClick={onRegister}>
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
