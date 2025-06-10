import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    alias: {
      '@index': path.resolve(__dirname, 'src/index.ts')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Sharable',
      fileName: (format) => {
        if (format === 'es') return 'index.mjs';
        if (format === 'cjs') return 'index.js';
        return 'index.js';
      },
      formats: ['es', 'cjs']
    },
    outDir: 'dist',
    rollupOptions: {
      external: [], 
    }
  },
  plugins: [dts()]
});
