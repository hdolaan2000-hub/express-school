import { useEffect, useRef } from 'react'

/**
 * Делает контейнер горизонтально прокручиваемым мышью и трекпадом:
 *  - вертикальное колесо мыши → горизонтальный скролл (иначе обычная мышь
 *    вообще не может прокрутить ряд, а полоса скролла скрыта);
 *  - перетаскивание зажатой кнопкой («схватить и тянуть»).
 * Возвращает ref, который нужно повесить на скролл-контейнер.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const scrollable = () => el.scrollWidth > el.clientWidth + 1

    // колесо: вертикальную прокрутку превращаем в горизонтальную
    const onWheel = (e: WheelEvent) => {
      if (!scrollable()) return
      // трекпад уже даёт deltaX — его не трогаем; обычная мышь даёт только deltaY
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      const before = el.scrollLeft
      el.scrollLeft += e.deltaY
      // прокрутили внутри ряда — гасим прокрутку страницы
      if (el.scrollLeft !== before) e.preventDefault()
    }

    // перетаскивание мышью. Захватываем указатель и «тянем» только после
    // смещения > порога — иначе обычный клик по кнопке карточки не сработает.
    let pending = false
    let dragging = false
    let startX = 0
    let startScroll = 0
    let pointerId = -1
    const THRESHOLD = 5

    const onPointerDown = (e: PointerEvent) => {
      if (!scrollable() || e.button !== 0) return
      pending = true
      startX = e.clientX
      startScroll = el.scrollLeft
      pointerId = e.pointerId
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!pending && !dragging) return
      const dx = e.clientX - startX
      if (pending && Math.abs(dx) > THRESHOLD) {
        pending = false
        dragging = true
        el.setPointerCapture(pointerId)
        el.style.cursor = 'grabbing'
      }
      if (dragging) el.scrollLeft = startScroll - dx
    }
    const endDrag = () => {
      pending = false
      dragging = false
      el.style.cursor = ''
    }

    // гасим нативное перетаскивание картинок/текста внутри ряда
    const onDragStart = (e: DragEvent) => e.preventDefault()

    // passive:false — чтобы preventDefault работал
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', endDrag)
    el.addEventListener('pointercancel', endDrag)
    el.addEventListener('dragstart', onDragStart)

    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', endDrag)
      el.removeEventListener('pointercancel', endDrag)
      el.removeEventListener('dragstart', onDragStart)
    }
  }, [])

  return ref
}
