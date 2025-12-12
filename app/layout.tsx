import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import ClientLayout from "./client-layout"
import { sharedMetadata } from "./metadata"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = sharedMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "VIERA Construction",
              url: "https://www.alkanyapi.com",
              logo: "https://www.alkanyapi.com/logo.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Altunizade Mah. Ord. Prof Fahrettin Kerim Gökay Cad. No7/8",
                addressLocality: "Üsküdar",
                addressRegion: "İstanbul",
                addressCountry: "TR",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+90-216-391-4940",
                contactType: "customer service",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ClientLayout>{children}</ClientLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
