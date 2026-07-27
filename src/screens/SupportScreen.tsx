import { useState } from 'react'
import styles from './SupportScreen.module.css'

export const SUPPORT_HEIGHT = 1031

type Faq = {
  question: string
  answer: string
}

const FAQ: Faq[] = [
  {
    question: 'Что такое Здоровье, Питание и Энергия?',
    answer:
      'Это игровые показатели твоего прогресса. Они растут по мере прохождения уроков и заданий и помогают удерживать интерес к обучению.',
  },
  {
    question: 'Как работает челлендж?',
    answer:
      'Челлендж — это ограниченное по времени задание. Выполни его до конца срока, чтобы получить награду и обогнать друзей в рейтинге.',
  },
  {
    question: 'Как пригласить друга?',
    answer:
      'Открой раздел «Друзья», нажми «Пригласить друга» и поделись своим кодом или ссылкой. Друг вводит код — и вы вместе в рейтинге.',
  },
  {
    question: 'Как начать курс?',
    answer:
      'Перейдите в раздел «Мои курсы», выберите интересующий курс и нажмите кнопку «Начать». Курс состоит из блоков, каждый блок — из уроков и теста.',
  },
  {
    question: 'Это обязательно? Есть ли оценки?',
    answer:
      'Обучение проходит в свободном темпе, жёстких оценок нет. Тесты нужны только для того, чтобы закрепить материал и открыть следующий блок.',
  },
]

export function SupportScreen() {
  // По умолчанию раскрыт 4-й вопрос — как в макете
  const [openIndex, setOpenIndex] = useState(3)

  return (
    <div className={styles.support}>
      <div className={styles.faqCard}>
        {FAQ.map((item, i) => {
          const open = i === openIndex
          return (
            <div key={item.question} className={styles.faqItem}>
              <button
                type="button"
                className={styles.faqHead}
                onClick={() => setOpenIndex(open ? -1 : i)}
              >
                <span className={styles.faqLeft}>
                  <span className={styles.faqQuestion}>{item.question}</span>
                  {open && <span className={styles.faqAnswer}>{item.answer}</span>}
                </span>
                <img
                  className={open ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron}
                  src="assets/chevron-down.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </button>
              <hr className={styles.faqDivider} />
            </div>
          )
        })}
      </div>

      <hr className={styles.sectionDivider} />
      <h2 className={styles.sectionTitle}>Написать в поддержку</h2>

      <div className={styles.formCard}>
        <div className={styles.formGroup}>
          <span className={styles.formLabel}>Тема обращения</span>
          <div className={styles.dropdown}>
            <span>Выберите тему</span>
            <img src="assets/chevron-down.svg" alt="" width={20} height={20} />
          </div>
          <span className={styles.formHint}>
            Варианты: Проблема с курсом, Технический вопрос, Предложение, Другое
          </span>
        </div>

        <div className={styles.formGroup}>
          <span className={styles.formLabel}>Ваше сообщение</span>
          <div className={styles.textarea}>Опишите вашу проблему или вопрос...</div>
        </div>

        <button type="button" className={styles.submitBtn}>
          Отправить обращение
        </button>
      </div>
    </div>
  )
}
