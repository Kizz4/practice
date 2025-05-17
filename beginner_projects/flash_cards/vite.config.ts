import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, '../common/img/icon_onglet.png'),
          dest: 'img',
        },
        {
          src: path.resolve(__dirname, '../common/font/static/*.ttf'),
          dest: 'fonts'
        },
      ],
    }),
  ],

})
