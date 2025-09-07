import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { readdirSync } from 'fs';

// Get all icon files
const iconDirs = readdirSync(resolve(__dirname, 'src/icons'))
  .filter(file => !file.includes('.stories.') && !file.includes('.test.') && !file.endsWith('.tsx'))
  .filter(file => {
    try {
      return readdirSync(resolve(__dirname, 'src/icons', file)).some(f => f.endsWith('.tsx'));
    } catch (e) {
      return false;
    }
  });

const iconFiles = iconDirs
  .map(dir => {
    const files = readdirSync(resolve(__dirname, 'src/icons', dir));
    const iconFile = files.find(file => file === `${dir}.tsx`);
    if (iconFile) {
      return {
        name: dir,
        path: resolve(__dirname, 'src/icons', dir, iconFile),
      };
    }
    return null;
  })
  .filter(Boolean) as { name: string; path: string }[];

// Create input entries for all icons
const inputEntries: Record<string, string> = {};
iconFiles.forEach(icon => {
  inputEntries[`icons/${icon.name}`] = icon.path;
});

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      include: ['src/icons'],
      outDir: 'dist/icons',
    }),
  ],
  build: {
    outDir: 'dist/icons',
    lib: {
      entry: inputEntries,
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'mjs' : 'cjs';
        return `${entryName}.${ext}`;
      },
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
