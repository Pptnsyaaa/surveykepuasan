# React + Vite

Template ini menyediakan setup minimal untuk menjalankan React pada Vite dengan fitur HMR dan beberapa aturan ESLint.

Saat ini tersedia dua plugin resmi:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) menggunakan [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) menggunakan [SWC](https://swc.rs/)

## Kompiler React

Kompiler React sudah aktif pada template ini. Lihat [dokumentasi ini](https://react.dev/learn/react-compiler) untuk informasi lebih lanjut.

Catatan: Hal ini akan memengaruhi performa development dan build Vite.

## Memperluas konfigurasi ESLint

Jika Anda sedang mengembangkan aplikasi produksi, kami sarankan menggunakan TypeScript dengan aturan lint yang peka tipe. Lihat [template TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) untuk mempelajari cara mengintegrasikan TypeScript dan [`typescript-eslint`](https://typescript-eslint.io) dalam proyek Anda.
