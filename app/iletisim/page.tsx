import { MapPin, Phone, Mail, Briefcase, Users } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { getContent } from "@/lib/github-content"

export const metadata = {
  title: "İletişim - Bize Ulaşın | Viera & Alkan Yapı",
  description:
    "Viera & Alkan Yapı iletişim bilgileri. Adres: Altunizade Mah. Ord. Prof Fahrettin Kerim Gökay Cad. No7/8 Üsküdar/İstanbul.",
}

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function ContactPage() {
  const contactData = await getContent<any>("contact")

  console.log("[v0] Contact page - contactData:", JSON.stringify(contactData, null, 2))

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {/* Contact Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">İletişim Formu</h2>
                <p className="text-muted-foreground">Aşağıdaki formu doldurarak bize mesaj gönderebilirsiniz.</p>
              </div>
              <ContactForm />
            </div>
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">İletişim Bilgileri</h2>
                <p className="text-muted-foreground">Aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz.</p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 mr-4">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Telefon</h3>
                    <p className="text-muted-foreground">{contactData?.phone || "0216 391 49 40"}</p>
                    <p className="text-muted-foreground">{contactData?.mobile || "0533 479 83 87"}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 mr-4">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">E-posta</h3>
                    <p className="text-muted-foreground">{contactData?.email || "info@alkanyapi.com.tr"}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 mr-4">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Adres</h3>
                    <p className="text-muted-foreground">
                      {contactData?.address ||
                        "Altunizade Mah. Ord. Prof Fahrettin Kerim Gökay Cad. No7/8 Üsküdar/ İstanbul"}
                    </p>
                  </div>
                </div>

                {contactData?.team && contactData.team.length > 0 && (
                  <>
                    {contactData.team.map((person: any, index: number) => {
                      const IconComponent =
                        person.icon === "Phone"
                          ? Phone
                          : person.icon === "Mail"
                            ? Mail
                            : person.icon === "Briefcase"
                              ? Briefcase
                              : Users
                      return (
                        <div key={index} className="flex items-start">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 mr-4">
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{person.title || "Yetkili Kişi"}</h3>
                            <p className="text-muted-foreground font-semibold">{person.name}</p>
                            {person.phone && <p className="text-muted-foreground text-sm">{person.phone}</p>}
                          </div>
                        </div>
                      )
                    })}
                  </>
                )}
              </div>
              <div className="aspect-video overflow-hidden rounded-xl border shadow-lg">
                <iframe
                  key={contactData?.mapUrl || "default-map"}
                  src={
                    contactData?.mapUrl ||
                    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.4725!2d29.0238!3d41.0228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAxJzIyLjQiTiAyOcKwMDEnMjUuNyJF!5e0!3m2!1str!2str!4v1620000000000!5m2!1str!2str"
                  }
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
