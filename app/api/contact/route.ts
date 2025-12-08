import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, message, to } = body

    // E-posta gondermek icin bir servis kullanabilirsiniz (ornegin Resend, SendGrid vb.)
    // Simdilik form verilerini loglayip basarili donuyoruz
    console.log("[v0] Contact form submission:", {
      to: to || "erdemalkan72@gmail.com",
      from: email,
      name: `${firstName} ${lastName}`,
      phone,
      message,
      timestamp: new Date().toISOString(),
    })

    // Basit bir mailto link olustur (fallback)
    // Gercek uygulamada burada e-posta servisi kullanilmali

    return NextResponse.json({ success: true, message: "Form alindi" })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json({ success: false, error: "Form gonderilemedi" }, { status: 500 })
  }
}
