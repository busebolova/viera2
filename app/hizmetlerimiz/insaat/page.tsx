export default function InsaatPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-center mb-8">İnşaat Hizmetleri</h1>

      {/* Giriş Bölümü */}
      <div className="mb-8">
        <p className="text-lg leading-relaxed">
          VIERA - Alkan Yapı & Viera Ortaklığı olarak, inşaat sektöründe yılların deneyimi ve uzmanlığı ile
          müşterilerimize yenilikçi ve sürdürülebilir çözümler sunmaktayız. Her türlü inşaat projesinde, tasarım
          aşamasından anahtar teslimine kadar titizlikle çalışarak, beklentilerinizi aşan sonuçlar elde etmeyi
          hedefliyoruz.
        </p>
      </div>

      {/* Hizmetlerimiz */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sunduğumuz Hizmetler</h2>
        <ul className="list-disc list-inside">
          <li>Konut İnşaatı</li>
          <li>Ticari Bina İnşaatı</li>
          <li>Endüstriyel Tesis İnşaatı</li>
          <li>Altyapı Projeleri</li>
          <li>Restorasyon ve Renovasyon</li>
          <li>Proje Yönetimi ve Danışmanlık</li>
        </ul>
      </div>

      {/* Kalite ve Güven */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Kalite ve Güven Anlayışımız</h2>
        <p className="text-lg leading-relaxed">
          VIERA - Alkan Yapı & Viera Ortaklığı olarak, kalite ve güvenilirlik ilkelerinden ödün vermeden çalışmaktayız.
          Projelerimizde en kaliteli malzemeleri kullanarak, güncel teknolojileri takip ediyor ve uzman kadromuzla en
          iyi işçiliği sunuyoruz. Müşteri memnuniyetini her zaman ön planda tutarak, projelerimizi zamanında ve bütçeye
          uygun olarak tamamlıyoruz.
        </p>
      </div>

      {/* İletişim */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">İletişime Geçin</h2>
        <p className="text-lg leading-relaxed">
          İnşaat projeleriniz için bizimle iletişime geçerek, uzman ekibimizden detaylı bilgi ve teklif alabilirsiniz.
        </p>
        <p>
          Telefon: <a href="tel:+905364364242">0536 436 4242</a>
        </p>
        <p>
          E-posta: <a href="mailto:info@viera.com.tr">info@viera.com.tr</a>
        </p>
      </div>
    </div>
  )
}
