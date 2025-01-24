import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'dnd-multi-backend': import.meta.resolve('dnd-multi-backend'),
      'react-dnd': import.meta.resolve('react-dnd'),
      'react-dnd-html5-backend': import.meta.resolve('react-dnd-html5-backend'),
      'react-dnd-touch-backend': import.meta.resolve('react-dnd-touch-backend'),
    },
  },
});
