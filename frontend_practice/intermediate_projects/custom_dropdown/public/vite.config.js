import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'sharable': path.resolve(__dirname, '../../sharable/src'),
      'sharable/*': path.resolve(__dirname, '../../sharable/src/*')
    }
  }
});
