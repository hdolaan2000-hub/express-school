import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Относительные пути к ассетам: сборка работает на любом хостинге и в любой
  // подпапке (GitHub Pages, S3, свой домен) без правки конфигурации.
  base: './',
  plugins: [react()],
})
