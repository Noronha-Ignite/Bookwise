import { useState, useEffect } from 'react'

export default function useDebounce<IValue = unknown>(
  value: IValue,
  delay: number,
) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
