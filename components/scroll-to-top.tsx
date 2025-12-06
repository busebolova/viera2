"use client"

import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Sayfa yüklendiğinde en üste scroll et
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Scroll pozisyonunu takip et
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 h-10 w-10 rounded-full bg-zinc-800 text-white shadow-lg hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
          size="icon"
          aria-label="Yukarı çık"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </>
  )
}
