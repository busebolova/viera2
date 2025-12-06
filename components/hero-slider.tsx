"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

interface HeroSliderProps {
  content?: {
    url?: string
    title?: string
    subtitle?: string
  }
}

export function HeroSlider({ content }: HeroSliderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const words = ["Güven", "Kalite", "Profesyonellik", "Deneyim", "Başarı"]
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (isLoading) return

    const currentWord = words[currentWordIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (typedText.length < currentWord.length) {
            setTypedText(currentWord.substring(0, typedText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (typedText.length > 0) {
            setTypedText(typedText.substring(0, typedText.length - 1))
          } else {
            setIsDeleting(false)
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? 50 : 150,
    )

    return () => clearTimeout(timeout)
  }, [isLoading, typedText, isDeleting, currentWordIndex, words])

  return (
    <section style={{ position: "relative", width: "100%", height: "70vh", overflow: "hidden" }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#18181b",
          }}
        >
          <div
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "50%",
              border: "4px solid #d4d4d8",
              borderTopColor: "#52525b",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      )}

      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 10 }} />

      <video
        ref={videoRef}
        src={content?.url || "https://cdn.pixabay.com/video/2020/06/23/42926-434300944_large.mp4"}
        autoPlay
        muted
        loop
        playsInline
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        onLoadedData={() => setIsLoading(false)}
        preload="auto"
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            padding: "0 1rem",
            textAlign: "center",
            color: "white",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: "700",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            Viera & Alkan Yapı
          </h1>

          <div
            style={{
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              fontWeight: "600",
              marginBottom: "1.5rem",
              minHeight: "4rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "#ffffff",
                textShadow: "0 2px 10px rgba(255,255,255,0.3)",
              }}
            >
              {typedText}
              <span style={{ animation: "blink 1s step-end infinite", color: "#ffffff" }}>|</span>
            </span>
          </div>

          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto 2rem",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "rgba(255,255,255,0.9)",
              textShadow: "0 1px 5px rgba(0,0,0,0.2)",
              lineHeight: 1.6,
            }}
          >
            60 yılı aşkın deneyimimiz ve köklü geçmişimizle konut ve iş yeri üretiminde güven ve kaliteyi ön planda
            tutuyoruz.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/hizmetlerimiz"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.875rem 2rem",
                backgroundColor: "#ffffff",
                color: "#18181b",
                borderRadius: "0.375rem",
                fontWeight: "600",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
            >
              Hizmetlerimiz
            </Link>
            <Link
              href="/iletisim"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.875rem 2rem",
                backgroundColor: "transparent",
                color: "white",
                border: "2px solid white",
                borderRadius: "0.375rem",
                fontWeight: "600",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
            >
              İletişime Geçin
            </Link>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.2), transparent, rgba(0,0,0,0.2))",
          pointerEvents: "none",
        }}
      />
    </section>
  )
}
