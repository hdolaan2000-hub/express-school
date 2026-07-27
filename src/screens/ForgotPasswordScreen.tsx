import styles from './auth.module.css'

export const FORGOT_HEIGHT = 900

export function ForgotPasswordScreen({
  onBack,
  onSubmit,
}: {
  onBack?: () => void
  onSubmit?: () => void
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

      <div className={styles.right}>
        <div className={styles.form}>
          <div className={styles.topAction}>
            <button type="button" className={styles.backBtn} onClick={onBack} aria-label="Назад">
              <img src="assets/icon-back.svg" alt="" width={40} height={40} />
            </button>
          </div>

          <div className={styles.headerText}>
            <h1 className={styles.title}>Забыли пароль?</h1>
            <p className={styles.subtitle}>
              Введите почту, на которую зарегистрирован аккаунт
            </p>
          </div>

          <div className={styles.inputs}>
            <div className={styles.field}>
              <span className={styles.label}>Электронная почта</span>
              <div className={styles.input}>
                <img src="assets/icon-mail.svg" alt="" width={20} height={20} />
                <span className={`${styles.inputText} ${styles.inputMuted}`}>name@school.ru</span>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.submit} onClick={onSubmit}>
              Отправить ссылку
            </button>
            <div className={styles.switch}>
              <span className={styles.switchMuted}>Вспомнили пароль?</span>
              <button type="button" className={styles.switchLink} onClick={onBack}>
                Войти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
