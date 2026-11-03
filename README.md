# Soft Pink Dreamy Birthday Surprise — For Dyanova Ganesafitri 🎀

Website ucapan ulang tahun interaktif, personal, manis, romantis tipis-tipis, dan penuh animasi dengan konsep **Soft Pink Dreamy Birthday Surprise**. Dibuat khusus untuk **Dyanova Ganesafitri** dari **Temen Level Maxxx**.

---

## ✨ Fitur & Keunggulan

1. **7 Scene Interaktif Bertahap (Digital Storytelling)**:
   - **Scene 1 (A Little Surprise)**: Pembuka hangat dengan floating hearts & bintang berkilau, disambut dialog musik ramah.
   - **Scene 2 (Someone Special)**: Animasi teks typewriter & slide-up dengan tombol skip/percepat.
   - **Scene 3 (A Thousand Little Hearts)**: Puluhan partikel hati berterbangan dan menyatu membentuk satu hati besar yang berdenyut (*heartbeat pulse*), mengungkap doa-doa tulus.
   - **Scene 4 (A Letter for Dyanova)**: Amplop pink 3D interaktif dengan segel hati. Saat disentuh, amplop terbuka dan surat meluncur keluar menjadi kartu bacaan yang nyaman dengan scroll halus.
   - **Scene 5 (Make A Wish)**: Suasana hangat lilin & bintang dengan countdown 3-2-1 dinamis (dilengkapi proteksi anti double-click).
   - **Scene 6 (The Birthday Surprise)**: Puncak perayaan dengan confetti pastel & gold, sambutan nama besar yang responsif, dan ucapan penuh kebahagiaan.
   - **Scene 7 (From Your Temen Level Maxxx)**: Kartu penutup yang manis & hangat dari "Temen Level Maxxx ♡", lengkap dengan tombol replay mulus untuk mengulang dari awal tanpa reload.

2. **Sistem Musik Pintar**:
   - Pilihan modal awal: *"Pakai musik 🎵"* atau *"Tanpa musik ♡"*.
   - Tombol toggle musik di sudut kanan atas dengan animasi sound waves.
   - Volume lembut (~25%) dengan transisi fade-in dan fade-out.
   - File lokal `public/audio/birthday-background.mp3` bebas royalti, plus fallback otomatis Web Audio API Music Box synthesizer jika file tidak tersedia.
   - Tidak pernah melakukan autoplay sebelum interaksi pengguna.

3. **Desain & Aksesibilitas**:
   - Palette warna pastel lembut: `#FFF8FB`, `#FFE4EF`, `#FFD1E3`, `#F5A9C8`, `#D877A2`, `#A84E7B`, `#925A75`.
   - Google Fonts: **Dancing Script** (judul romantis), **Poppins** (tombol/UI), **Quicksand** (body text).
   - *Mobile-First Responsive Design*: Sangat nyaman di smartphone (320px–480px), tablet, hingga desktop, dengan safe-area padding.
   - Mendukung `prefers-reduced-motion` dan keyboard navigation.
   - Tanpa foto, tanpa backend, 100% lightweight & performant.

---

## 🛠️ Tech Stack

- **Vue 3** (Composition API)
- **Vite**
- **GSAP** (Animasi transisi & timeline)
- **HTML5 Canvas & SVG** (Heart formation & floating particles)
- **canvas-confetti** (Efek perayaan ulang tahun)
- **CSS3 Variables & Animations**

---

## 🚀 Cara Menjalankan Project

### 1. Mode Development
```bash
npm run dev
```
Buka URL lokal yang muncul (biasanya `http://localhost:5173`).

### 2. Build Production
```bash
npm run build
```
File hasil build siap dideploy akan berada di folder `dist/`.

### 3. Preview Hasil Build
```bash
npm run preview
```
