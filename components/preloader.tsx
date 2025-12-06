"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check if already visited in this session
    const hasVisited = sessionStorage.getItem("hasVisited")
    if (hasVisited) {
      setLoading(false)
      return
    }

    // Mark as visited
    sessionStorage.setItem("hasVisited", "true")

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    // Hide preloader after animation
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, [])

  if (!mounted || !loading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950">
      <div className="relative w-64 h-64 mb-8">
        <Image src="/darklogo.png" alt="VIERA Construction" fill className="object-contain" priority />
      </div>
      <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-white transition-all duration-100 ease-out" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-2 text-white/70 text-xs">{progress}%</div>
    </div>
  )
}
