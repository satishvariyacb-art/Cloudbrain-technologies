import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  let proxyTarget = '';
  try {
    proxyTarget = new URL(env.VITE_API_URL).origin;
  } catch {
    proxyTarget = '';
  }

  return {
    plugins: [react()],
    server: {
      port: 5174,
      strictPort: true,
      proxy: proxyTarget
        ? {
            '/api': {
              target: proxyTarget,
              changeOrigin: true
            }
          }
        : undefined
    }
  };
});
