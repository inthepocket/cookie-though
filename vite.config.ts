import { defineConfig } from 'vite';
import path from 'path';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib.ts'),
      name: 'Cookie Though',
      fileName: (format: string) => `cookie-though.${format}.js`,
    },
    outDir: '../dist',
  },
  plugins: [preact()],
  root: 'www',
});
