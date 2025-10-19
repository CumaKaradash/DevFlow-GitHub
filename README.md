# DevFlow - Geliştirici Verimlilik Paneli (TR/EN)

[🇹🇷 Türkçe](https://www.google.com/search?q=%23devflow---geli%C5%9Ftirici-verimlilik-paneli) | [🇬🇧 English](https://www.google.com/search?q=%23devflow---developer-productivity-dashboard)

-----

## 🇹🇷 Türkçe

Tüm verimlilik araçlarınız tek bir yerde. DevFlow, geliştiriciler için tasarlanmış minimalist bir paneldir. Pomodoro zamanlayıcısı, GitHub istatistikleri, günlük hedefler ve kod parçacıklarınızı (snippet) tek bir arayüzde birleştirerek odaklanmanıza yardımcı olur.

[](https://www.google.com/search?q=LICENSE)
[](https://nextjs.org/)
[](https://www.typescriptlang.org/)
[](https://tailwindcss.com/)
[](https://github.com/pmndrs/zustand)

## Canlı Demo

Projeyi canlı olarak deneyimlemek için aşağıdaki bağlantıyı ziyaret edebilirsiniz:

➡️ **[https://devflowgithub.vercel.app/](https://devflowgithub.vercel.app/)** ⬅️

## Önizleme

<img width="952" height="734" alt="Ekran görüntüsü 2025-10-19 045346" src="https://github.com/user-attachments/assets/2288cda1-522a-422f-85f7-308d37bca7b8" />

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

-----

## 🇬🇧 English

# DevFlow - Developer Productivity Dashboard

All your productivity tools in one place. DevFlow is a minimalist dashboard designed for developers. It helps you stay focused by combining a Pomodoro timer, GitHub statistics, daily goals, and your code snippets into a single interface.

[](https://www.google.com/search?q=LICENSE)
[](https://nextjs.org/)
[](https://www.typescriptlang.org/)
[](https://tailwindcss.com/)
[](https://github.com/pmndrs/zustand)

## Live Demo

You can visit the link below to experience the project live:

➡️ **[https://devflowgithub.vercel.app/](https://devflowgithub.vercel.app/)** ⬅️

## Preview

<img width="952" height="734" alt="Ekran görüntüsü 2025-10-19 045346" src="https://github.com/user-attachments/assets/026a15ec-50a9-489a-ad20-fac7fe042e1f" />

## Why DevFlow?

As developers, we constantly switch between multiple tools throughout the day (timer, notepad, GitHub, task list). This leads to distraction and inefficiency. DevFlow solves this problem by gathering the essential productivity tools a developer needs into a single, fast, and minimalist dashboard that eliminates distractions.

-----

## Main Features

  * **Pomodoro Timer:** Adjustable focus, short, and long break cycles. Sound notifications and auto-start options are available.
  * **GitHub Activity:** Enter your GitHub username to see your basic statistics (repo count, total stars, follower count, etc.) on the dashboard.
  * **Daily Goals:** Categorize your daily tasks as "Code", "Learn", "Exercise", or "Other" and track your progress.
  * **Code Snippets:** Save, edit, and easily copy your frequently used code blocks to the clipboard, organized by language and tags.
  * **Weekly Analysis:** A weekly activity chart showing completed focus sessions and goals.
  * **Data Management:** All your data (goals, snippets, settings) is stored in your browser's local storage. Export or import your data in JSON format.
  * **Theme Support:** Light and dark mode support.

## Tech Stack

  * **Framework:** [Next.js](https://nextjs.org/) (App Router)
  * **Language:** [TypeScript](https://www.typescriptlang.org/)
  * **State Management:** [Zustand](https://github.com/pmndrs/zustand)
  * **Styling:** [Tailwind CSS](https://tailwindcss.com/)
  * **UI Library:** [shadcn/ui](https://ui.shadcn.com/)
  * **Data Fetching:** [SWR](https://swr.vercel.app/) (for GitHub API)
  * **Charts:** [Recharts](https://recharts.org/)
  * **Icons:** [Lucide React](https://lucide.dev/)
  * **Package Manager:** [pnpm](https://pnpm.io/)

## Project Structure

The project is organized with a feature-based structure and adheres to `shadcn/ui` standards.

```
.
├── app/
│   ├── layout.tsx         # Main layout
│   └── page.tsx           # Main page (Combines all components)
│
├── components/
│   ├── ui/                # shadcn/ui components (Button, Card, etc.)
│   ├── activity/          # Weekly activity chart
│   ├── github/            # GitHub widget
│   ├── goals/             # Daily goals component
│   ├── pomodoro/          # Pomodoro timer
│   ├── snippets/          # Code snippet manager
│   ├── header.tsx         # Main header (includes theme switcher)
│   └── settings-modal.tsx # Settings, data import/export
│
├── lib/
│   ├── stores/
│   │   └── devflow-store.ts # Zustand state management (core logic)
│   └── utils.ts           # `cn` (tailwind merge) function
│
├── public/                # Logo, icons, and manifest
│
└── package.json           # Dependencies and scripts
```

## Quick Start

Follow the steps below to run the project on your local machine:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/CumaKaradash/DevFlow-GitHub.git
    cd DevFlow-GitHub
    ```

2.  **Install dependencies:**
    *(pnpm is recommended)*

    ```bash
    pnpm install
    ```

3.  **Start the development server:**

    ```bash
    pnpm dev
    ```

4.  **Open in your browser:**
    `http://localhost:3000`

## Configuration

The project does not require any mandatory environment variables (`.env` file) for local development.

However, the GitHub Activity module uses GitHub's public API directly. If you frequently encounter rate limiting, you can update the SWR fetcher function (in `components/github/activity-widget.tsx`) to use a personal GitHub API key (Personal Access Token).

## Roadmap / TODO

The project is actively being developed. Some planned features include:

  * [ ] **Snippet Search:** Quick search within saved snippets.
  * [ ] **Detailed Statistics:** More detailed, date-based statistics for Pomodoro and goals.
  * [ ] **PWA Support:** Offline usage and add-to-homescreen for mobile.
  * [ ] **Integrations:** (Optional) Integration with tools like Jira, GitLab, or Trello.
  * [ ] **Keyboard Shortcuts:** Shortcuts for faster navigation within the app.

## Contributing

Your contributions help make the project better\! Bug reports, feature suggestions, or pull requests are welcome.

1.  Fork the project.
2.  Create a new branch for your feature or fix (`git checkout -b feature/new-feature`).
3.  Commit your changes (`git commit -m 'Add new feature'`).
4.  Push your branch (`git push origin feature/new-feature`).
5.  Open a Pull Request (PR).

## Author

The main author of this project and its source code is **CumaKaradash**.

## License

This project is licensed under the MIT License.
