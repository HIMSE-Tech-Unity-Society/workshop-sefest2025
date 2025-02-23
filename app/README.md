## Reactjs Typescript Template

Ini adalah proyek [React.js](https://react.dev/) di-bootstrap dengan [`vitejs`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md).

## Teknologi Yang Digunakan

- [React.js (Typescript)](https://react.dev/)
- [Tailwindcss](https://tailwindcss.com/)
- [Axios](https://axios-http.com/docs/intro/)

## Fitur

Fitur yang terdapat pada templat proyek ini adalah:

- Proyek Arsitektur.
- Authentikasi.
- Kustomisasi `React Hooks`.
- Beberapa fungsi kustom yang sering [Saya](https://github.com/nuflakbrr) pakai.

### Proyek Arsitektur

Terdapat beberapa poin penting terkait bagaimana menjalankan proyek arsitektur yang benar. Untuk studi kasus kali ini, Saya telah membuatkan sebuah templat proyek kosong yang sudah Saya kustomisasi yang sekiranya sudah mengimplementasi bagaimana cara mengatur proyek arsitektur yang baik agar terlihat rapi.

```
/
├── public/
├── src/
│   └── components/
│   │   └── Common/
│   │   └── Containers/
│   │   └── Mixins/
│   │   └── README.md
│   └── config/
│   └── context/
│   └── data/
│   └── hooks/
│   └── interfaces/
│   └── layouts/
│   └── lib/
│   └── pages/
│   └── providers/
│   └── index.css
│   └── main.tsx
│   └── vite-env.d.ts
└── .gitignore
└── .eslint.config.js
└── index.html
└── package.json
└── postcss.config.js
└── README.md
└── tailwind.config.js
└── tsconfig.app.json
└── tsconfig.json
└── tsconfig.node.json
└── vite.config.ts
```

#### Folder Common

Folder `Common` terletak pada `/src/components/`. Lalu didalamnya berisikan apa saja? Folder `Common` Berisikan komponen-komponen kecil, seperti: tombol, dropdown, dll.

#### Folder Mixins

Folder `Mixins` terletak pada `/src/components/`. Lalu didalamnya berisikan apa saja? Folder `Mixins` Berisikan komponen-komponen yang merupakan gabungan dari komponen-komponen kecil dari folder `Common`. Seperti: navbar (yang berisi beberapa hal umum seperti tombol, dropdown, dll).

#### Folder Containers

Folder `Containers` terletak pada `/src/components/`. Lalu didalamnya berisikan apa saja? Folder `Containers` Berisikan kombinasi folder `Common` dan halaman itu sendiri yang membentuk 1 halaman. 1 halaman 1 folder `Containers` agar tetap rapi.

Jika pada 1 container memiliki beberapa section, maka Anda harus memisahkan dan menaruhnya di dalam folder `components` namun masih tetap dalam 1 folder `Containers`. Seperti: `/src/components/Containers/Home/components`.

### Authentikasi

Pada templat proyek ini sudah menggunakan authentikasi menggunakan `React Context`. Jika user sudah melakukan authentikasi maka user tidak bisa mengakses halaman `login` atau `register` kembali.

### Kustomisasi React Hooks

Anda dapat menggunakan, serta menambahkan kustom `React Hooks` Anda sendiri pada folder `/src/hooks` yang telah disediakan. terdapat sebuah contoh kustomisasi `React Hooks` untuk `Data Fetching` menggunakan [Axios](https://axios-http.com/docs/intro).

## Mulai Sekarang

Template ini tersedia di BikinProject! Cara bagaimana untuk menggunakan template ini, ikuti langkah-langkah sederhana berikut:

1. **Instal BikinProject**: Mulailah dengan menginstal BikinProject di komputer Anda.

```bash
  npx bikinproject@latest
```

2. **Beritahu BikinProject Tempat Membuat Proyek**: Masukkan direktori tempat Anda ingin membuat proyek.

```bash
  ┌   create-bikinproject-app
  │
  ◇  Where should we create your project?
  └  ./your-project # Masukkan nama proyek Anda, seperti my-project atau .
```

3. **Pilih Proyek Starter**: Pilih proyek permulaan yang sesuai dengan kebutuhan Anda.

```bash
  ┌   create-bikinproject-app
  │
  ◇  Where should we create your project?
  │  ./your-project
  │
  ◇  Pick a project type within "./your-project"
  │  ● React.js (Tailwind + TypeScript)
  │  ○ React.js (Tailwind + JavaScript)
  │  ○ dll.
  └  # Pilih jenis proyek dengan menggunakan tombol panah
```

4. **Pilih sertakan instal dependensi**: Pilih untuk menginstal dependensi atau tidak.

```bash
  ┌   create-bikinproject-app
  │
  ◇  Where should we create your project?
  │  ./your-project
  │
  ◇  Pick a project type within "./your-project"
  │  React.js (Tailwind + TypeScript)
  │
  ◇  Install dependencies? (currently only NPM is supported)
  │  ● Yes / ○ No
  └  # Pilih Ya atau Tidak menggunakan tombol panah
```

5. **Tunggu BikinProject Membuat Proyek**: Tunggu BikinProject membuat proyek untuk Anda.

> [!NOTE]
> Jika Anda memilih untuk memasang dependensi, BikinProject akan memasang dependensi yang diperlukan untuk Anda. Harap tunggu hingga penginstalan selesai.

```bash
  ┌   create-bikinproject-app
  │
  ◇  Where should we create your project?
  │  ./your-project
  │
  ◇  Pick a project type within "./your-project"
  │  React.js (Tailwind + TypeScript)
  │
  ◇  Install dependencies? (currently only NPM is supported)
  │  No
  │
  ◇  ⏳ Creating project...
  │
  ◇  🎉 Project Created!
  │
  ◇  Next steps. ───────────────╮
  │                             │
  │  cd ./your-project          │
  │  npm install                │
  │  npm run dev                │
  │                             │
  ├─────────────────────────────╯
  │
  └  Have a Problems? Report to https://github.com/nuflakbrr/bikinproject/issues
```

6. **Mulai Membangun Proyek Anda**: Setelah BikinProject menghasilkan `starter project`, selanjutnya membangun proyek Anda.

7. **Salin Environment Variable**: Salin `environment variable` dengan perintah berikut

```bash
cp .env.example .env
```

8. **Buka Server Pengembangan**: Buka [http://localhost:5173](http://localhost:5173) pada browser Anda dan lihat hasilnya.

Anda dapat mulai mengedit halaman dengan memodifikasi `/src/components/Containers/Home/index.tsx`. Halaman diperbarui secara otomatis saat Anda mengedit file.

## Pelajari Lebih

Untuk mempelajari lebih lanjut tentang React.js, lihat referensi berikut:

- [Dokumentasi React.js](https://react.dev/learn) - tutorial React.js yang interaktif.

Anda dapat memeriksa [GitHub Repositori React.js](https://github.com/facebook/react/) - umpan balik dan kontribusi Anda dipersilakan!

## Author Templat Ini

Nama kontributor dan info kontak,

Naufal Akbar Nugroho  
[@nuflakbrr](https://github.com/nuflakbrr)
[@kbrnugroho](https://instagram.com/kbrnugroho)
