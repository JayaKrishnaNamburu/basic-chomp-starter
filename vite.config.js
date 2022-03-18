import { defineConfig } from "vite";
import config from "./teleport.config.json";
import react from "@vitejs/plugin-react";

const exclude = [...Object.keys(config?.importmap?.imports || {})];

export default defineConfig({
  clearScreen: true,
  optimizeDeps: {
    exclude,
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      external: exclude,
    },
  },
  css: {
    modules: {
      scopeBehaviour: "local"
    },
  },
  plugins: [react()],
});
      