import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  css: { postcss: {} },
  plugins: [react()],
  server: { port: 5173 },
  build: { outDir: "dist" }
});
