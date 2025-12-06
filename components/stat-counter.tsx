"use client"

import { useState, useEffect, useRef } from "react"

interface StatCounterProps {
  value: number
  label: string
}

export function StatCounter({ value, label }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const duration = 2000 // 2 seconds
          const step = 16 // 60fps
          const increment = Math.ceil(value / (duration / step))

          const timer = setInterval(() => {
            start += increment
            if (start > value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(start)
            }
          }, step)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [value, hasAnimated])

  return (
    <div ref={countRef} className="flex flex-col items-center text-center">
      <div className="text-4xl md:text-5xl font-bold mb-2">{count}+</div>
      <div className="text-sm uppercase tracking-wider text-white/80">{label}</div>
    </div>
  )
}
