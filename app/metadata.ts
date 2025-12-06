import type { Metadata } from "next"

const siteConfig = {
  name: "VIERA - Alkan Yapı & Viera Ortaklığı",
  description:
    "VIERA, Alkan Yapı & Viera Ortaklığı ile Üsküdar'da 60 yılı aşkın deneyimle konut projeleri, ticari binalar ve karma kullanımlı yapı projeleri. İstanbul'un önde gelen inşaat ve müteahhitlik firması.",
  url: "https://www.alkanyapi.com",
  ogImage: "/og-image.png",
  links: {
    instagram: "https://instagram.com/viera.construction",
    linkedin: "https://linkedin.com/company/viera-construction",
  },
}

export const sharedMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "VIERA",
    "Alkan Yapı",
    "Viera Construction",
    "İnşaat",
    "Konut Projeleri",
    "Ticari Projeler",
    "Karma Kullanımlı Projeler",
    "Üsküdar",
    "İstanbul",
    "Türkiye",
    "İnşaat Firması",
    "Kentsel Dönüşüm",
    "Müteahhitlik",
    "Yapı",
    "Konut",
    "Daire",
    "Apartman",
    "İnşaat Şirketi",
    "Müteahhit",
    "Otel İnşaatı",
    "Rezidans",
    "AVM İnşaatı",
    "Ofis Binası",
    "Villa Projesi",
    "Lüks Konut",
    "Yatırım Projesi",
    "Anahtar Teslim Proje",
  ],
  authors: [{ name: "VIERA - Alkan Yapı & Viera Ortaklığı" }],
  creator: "VIERA - Alkan Yapı & Viera Ortaklığı",
  publisher: "VIERA - Alkan Yapı & Viera Ortaklığı",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "VIERA - Alkan Yapı & Viera Ortaklığı - İstanbul İnşaat Firması",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "tr-TR": siteConfig.url,
    },
  },
  verification: {
    google: "google-site-verification-code-here",
    yandex: "yandex-verification-code-here",
  },
  category: "construction",
  other: {
    "geo.region": "TR-34",
    "geo.placename": "Üsküdar, İstanbul",
    "geo.position": "41.022885;29.023861",
    ICBM: "41.022885, 29.023861",
  },
}
