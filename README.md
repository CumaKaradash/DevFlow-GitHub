# DevFlow - Geliştirici Verimlilik Paneli

Tüm verimlilik araçlarınız tek bir yerde. DevFlow, geliştiriciler için tasarlanmış minimalist bir paneldir. Pomodoro zamanlayıcısı, GitHub istatistikleri, günlük hedefler ve kod parçacıklarınızı (snippet) tek bir arayüzde birleştirerek odaklanmanıza yardımcı olur.

[](https://www.google.com/search?q=LICENSE)
[](https://nextjs.org/)
[](https://www.typescriptlang.org/)
[](https://tailwindcss.com/)
[](https://github.com/pmndrs/zustand)

## Canlı Demo

Projeyi canlı olarak deneyimlemek için aşağıdaki bağlantıyı ziyaret edebilirsiniz:

➡️ **[https://https://devflowgithub.vercel.app/](https://devflowgithub.vercel.app/)** ⬅️

## Önizleme
<img width="952" height="733" alt="image" src="https://github.com/user-attachments/assets/47953ee3-3ceb-4567-bebb-5010d5e70640" />


## Neden DevFlow?

Geliştiriciler olarak, gün içinde birden fazla araç (zamanlayıcı, not defteri, GitHub, görev listesi) arasında sürekli geçiş yaparız. Bu durum odak dağınıklığına ve verimsizliğe yol açar. DevFlow, bir geliştiricinin ihtiyaç duyduğu temel verimlilik araçlarını, dikkat dağıtmayan, hızlı ve minimalist tek bir panelde toplayarak bu sorunu çözer.

-----

## Ana Özellikler

  * **Pomodoro Zamanlayıcı:** Ayarlanabilir fokus, kısa ve uzun mola döngüleri. Sesli bildirimler ve otomatik başlatma seçenekleri mevcuttur.
  * **GitHub Aktivite:** GitHub kullanıcı adınızı girerek temel istatistiklerinizi (repo sayısı, toplam yıldız, takipçi sayısı vb.) panel üzerinde görün.
  * **Günlük Hedefler:** Günlük görevlerinizi "Kod", "Öğrenme", "Egzersiz" veya "Diğer" olarak kategorilendirin ve ilerlemenizi takip edin.
  * **Kod Parçacıkları (Snippets):** Sık kullandığınız kod bloklarını dil ve etiketlere göre kaydedin, düzenleyin ve kolayca panoya kopyalayın.
  * **Haftalık Analiz:** Tamamlanan fokus oturumlarını ve hedefleri gösteren bir haftalık aktivite grafiği.
  * **Veri Yönetimi:** Tüm verileriniz (hedefler, snippet'ler, ayarlar) tarayıcınızın local storage'ında saklanır. Verilerinizi JSON formatında dışa aktarın veya içe aktarın.
  * **Tema Desteği:** Açık ve koyu mod desteği.

## Teknoloji Yığını

  * **Framework:** [Next.js](https://nextjs.org/) (App Router)
  * **Dil:** [TypeScript](https://www.typescriptlang.org/)
  * **State Management:** [Zustand](https://github.com/pmndrs/zustand)
  * **Styling:** [Tailwind CSS](https://tailwindcss.com/)
  * **UI Kütüphanesi:** [shadcn/ui](https://ui.shadcn.com/)
  * **Veri Çekme:** [SWR](https://swr.vercel.app/) (GitHub API için)
  * **Grafikler:** [Recharts](https://recharts.org/)
  * **İkonlar:** [Lucide React](https://lucide.dev/)
  * **Paket Yöneticisi:** [pnpm](https://pnpm.io/)

## Proje Yapısı

Proje, özellik bazlı (feature-based) bir yapıya ve `shadcn/ui` standartlarına uygun olarak düzenlenmiştir.

```
.
├── app/
│   ├── layout.tsx         # Ana layout
│   └── page.tsx           # Ana sayfa (Tüm bileşenleri birleştirir)
│
├── components/
│   ├── ui/                # shadcn/ui bileşenleri (Button, Card, vs.)
│   ├── activity/          # Haftalık aktivite grafiği
│   ├── github/            # GitHub widget'ı
│   ├── goals/             # Günlük hedefler bileşeni
│   ├── pomodoro/          # Pomodoro zamanlayıcısı
│   ├── snippets/          # Kod parçacığı yöneticisi
│   ├── header.tsx         # Ana başlık (Tema değiştirici içerir)
│   └── settings-modal.tsx # Ayarlar, veri içe/dışa aktarma
│
├── lib/
│   ├── stores/
│   │   └── devflow-store.ts # Zustand state yönetimi (ana mantık)
│   └── utils.ts           # `cn` (tailwind merge) fonksiyonu
│
├── public/                # Logo, ikonlar ve manifest
│
└── package.json           # Bağımlılıklar ve scriptler
```

## Hızlı Başlangıç

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1.  **Depoyu klonlayın:**

    ```bash
    git clone https://github.com/CumaKaradash/DevFlow-GitHub.git
    cd DevFlow-GitHub
    ```

2.  **Bağımlılıkları yükleyin:**
    *(pnpm önerilir)*

    ```bash
    pnpm install
    ```

3.  **Geliştirme sunucusunu başlatın:**

    ```bash
    pnpm dev
    ```

4.  **Tarayıcınızda açın:**
    `http://localhost:3000`

## Yapılandırma

Proje, yerel geliştirme için herhangi bir zorunlu ortam değişkeni (`.env` dosyası) gerektirmez.

Ancak, GitHub Aktivite modülü doğrudan GitHub'ın herkese açık API'sini kullanır. Eğer sık sık hız limitlerine (rate limiting) takılırsanız, SWR fetcher fonksiyonunu (`components/github/activity-widget.tsx` içinde) kişisel bir GitHub API anahtarı (Personal Access Token) kullanacak şekilde güncelleyebilirsiniz.

## Yol Haritası / TODO

Proje aktif olarak geliştirilmektedir. Planlanan bazı özellikler:

  * [ ] **Snippet Arama:** Kayıtlı snippet'ler içinde hızlı arama.
  * [ ] **Detaylı İstatistikler:** Pomodoro ve hedefler için daha detaylı tarih bazlı istatistikler.
  * [ ] **PWA Desteği:** Çevrimdışı kullanım ve mobil ana ekrana ekleme.
  * [ ] **Entegrasyonlar:** (Opsiyonel) Jira, GitLab veya Trello gibi araçlarla entegrasyon.
  * [ ] **Klavye Kısayolları:** Uygulama içinde daha hızlı gezinme için kısayollar.

## Katkıda Bulunma

Katkılarınız projeyi daha iyi hale getirmemize yardımcı olur\! Hata raporları, özellik önerileri veya pull request'ler memnuniyetle karşılanır.

1.  Projeyi fork'layın.
2.  Kendi özelliğiniz veya düzeltmeniz için yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`).
3.  Değişikliklerinizi commit'leyin (`git commit -m 'Yeni özellik eklendi'`).
4.  Branch'inizi push'layın (`git push origin feature/yeni-ozellik`).
5.  Bir Pull Request (PR) açın.

## Yazar

Bu proje ve kaynak kodunun ana yazarı **CumaKaradash**'tır.
## Lisans

Bu proje MIT lisansı ile lisanslanmıştır.
