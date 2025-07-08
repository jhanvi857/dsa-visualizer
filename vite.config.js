import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', // ✅ Vercel expects this
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        visualizeFunc: path.resolve(__dirname, 'src/utils/visualizeFunc.js'),
        visualizer: path.resolve(__dirname, 'src/utils/visualizer.js'),
      },
      output: {
        entryFileNames: '[name].js',
        format: 'es',
      },
    },
  },
});
