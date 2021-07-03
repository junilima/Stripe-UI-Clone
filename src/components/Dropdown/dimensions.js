import { useCallback, useLayoutEffect, useState } from 'react'

const getDimensions = (element) => element.getBoundingClientRect()

export function useDimensions(responsive = true) {
  const [dimensions, setDimensions] = useState(null)
  const [element, setElement] = useState(null)

  const hook = useCallback((e) => setElement(e), [])

  useLayoutEffect(() => {
    if (element && getDimensions(element)) {
      const updateDimensions = () => {
        window.requestAnimationFrame(() => {
          setDimensions(getDimensions(element))
        })
      }

      updateDimensions()

      if (responsive) {
        window.addEventListener('resize', updateDimensions)

        return () => {
          window.removeEventListener('recize', updateDimensions)
        }
      }
    }
  }, [element, hook, responsive])

  return [hook, dimensions, element]
}
