import { useEffect, useState } from 'react'

export type Stage = {
  /** Масштаб сцены: 1 на широких экранах, <1 на узких */
  scale: number
  /** Ширина сцены в координатах макета */
  width: number
}

/**
 * Поведение задано двумя макетами — «Home» (1440) и «Home Big» (1958):
 *
 * - Шире 1440 сцена НЕ масштабируется. Сайдбар остаётся прибит к левому краю,
 *   блок карточек фиксированной ширины центрируется в оставшемся пространстве,
 *   по бокам появляются поля. Приветствие и иконки прижаты к краям экрана.
 * - Уже 1440 места для этого нет, поэтому сцена целиком сжимается через scale.
 *
 * Ширину берём у documentElement, а не у window: innerWidth включает
 * вертикальный скроллбар, из-за чего сцена вылезала бы за экран по горизонтали.
 */
export function useStageScale(designWidth: number): Stage {
  const [stage, setStage] = useState<Stage>({ scale: 1, width: designWidth })

  useEffect(() => {
    const update = () => {
      const available = document.documentElement.clientWidth
      const scale = Math.min(1, available / designWidth)
      setStage({ scale, width: available / scale })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [designWidth])

  return stage
}
