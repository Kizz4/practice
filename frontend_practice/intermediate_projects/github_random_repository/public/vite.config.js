import { defineConfig } from 'vite';
import path from 'path';


export default defineConfig({
  resolve: {
    alias: {
      'src' : path.resolve(__dirname, "src"),
      'sharable': path.resolve(__dirname, '../../sharable/src'),
      'sharable/*': path.resolve(__dirname, '../../sharable/src/*')
    }
  }
});
