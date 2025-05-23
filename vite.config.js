import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      include: [/\.jsx?$/, /\.js$/], // Process both .js and .jsx as JSX
    }),
  ],
})