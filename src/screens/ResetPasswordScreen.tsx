import styles from './auth.module.css'

export const RESET_HEIGHT = 900

export function ResetPasswordScreen({
  onBack,
  onSave,
}: {
  onBack?: () => void
  onSave?: () => void
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
          <div className={styles.topAction}>
            <button type="button" className={styles.backBtn} onClick={onBack} aria-label="Назад">
              <img src="assets/icon-back.svg" alt="" width={40} height={40} />
            </button>
          </div>

          <div className={styles.headerText}>
            <h1 className={styles.title}>Новый пароль</h1>
            <p className={styles.subtitle}>Придумайте надёжный пароль для аккаунта</p>
          </div>

          <div className={`${styles.inputs} ${styles.inputsTight}`}>
            <div className={styles.field}>
              <span className={styles.label}>Новый пароль</span>
              <div className={styles.input}>
                <img src="assets/icon-lock-input.svg" alt="" width={20} height={20} />
                <span className={`${styles.inputText} ${styles.inputMuted}`}>Минимум 6 символов</span>
                <img className={styles.eye} src="assets/icon-eye.svg" alt="" width={20} height={20} />
              </div>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>Повторите пароль</span>
              <div className={styles.input}>
                <img src="assets/icon-lock-input.svg" alt="" width={20} height={20} />
                <span className={`${styles.inputText} ${styles.inputMuted}`}>••••••••</span>
                <img className={styles.eye} src="assets/icon-eye.svg" alt="" width={20} height={20} />
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.submit} onClick={onSave}>
              Сохранить пароль
            </button>
            <button type="button" className={styles.backLink} onClick={onBack}>
              Вернуться ко входу
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
