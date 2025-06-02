import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'shared_components': path.resolve(__dirname, '../../shared_components/src'),
      'shared_components/*': path.resolve(__dirname, '../../shared_components/src/*')
    }
  }
});
