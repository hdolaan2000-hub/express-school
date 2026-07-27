import styles from './QuestCard.module.css'

export function QuestCard() {
  return (
    <section className={styles.card}>
      <img className={styles.icon} src="assets/quest-icon.svg" alt="" width={26} height={26} />
      <h2 className={styles.title}>Квест: Тайна пропавшего помидора</h2>
      <img
        className={styles.cover}
        src="assets/quest-v3.png"
        alt="Квест: тайна пропавшего помидора"
      />
      <p className={styles.description}>
        Помогите поварам найти ингредиент и приготовить блюдо! Помогите поварам найти ингредиент и
        приготовить блюдо! Помогите поварам найти ингредиент и приготовить блюдо!
      </p>
      <div className={styles.footer}>
        <div className={styles.reward}>
          <span className={styles.rewardLabel}>Награда:</span>
          <span className={styles.rewardValue}>
            <img src="assets/reward-star.svg" alt="" width={16.67} height={15.89} />
            <span>200 XP</span>
          </span>
        </div>
        <button type="button" className={styles.startButton}>
          Начать занятие!
        </button>
      </div>
    </section>
  )
}
