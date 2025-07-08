import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        visualizeFunc: path.resolve(__dirname, 'src/utils/visualizeFunc.js'),
        visualizer: path.resolve(__dirname, 'src/utils/visualizer.js'),
      },
      output: {
        entryFileNames: '[name].js',
        dir: 'public/bundle', // output folder inside public
        format: 'es',
      },
    },
    emptyOutDir: false, // so it doesn't delete public
  },
});
