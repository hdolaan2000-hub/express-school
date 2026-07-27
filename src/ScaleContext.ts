import { createContext, useContext } from 'react'

/** Текущий масштаб сцены. Нужен фиксированным оверлеям (модалки, карточка
 *  пользователя), которые живут вне трансформируемой сцены и скейлятся сами. */
export const ScaleContext = createContext(1)

export const useScale = () => useContext(ScaleContext)
