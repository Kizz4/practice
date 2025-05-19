import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, '../../common/img/icon_onglet.png'),
          dest: 'img',
        },
        {
          src: path.resolve(__dirname, '../../common/font/static/*.ttf'),
          dest: 'fonts'
        },
      ],
    }),
  ],

})
