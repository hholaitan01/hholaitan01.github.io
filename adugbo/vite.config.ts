import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" so the build runs from any sub-path (GitHub Pages project folder, itch.io, a static host)
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: { target: "es2022", chunkSizeWarningLimit: 2500 },
  optimizeDeps: { exclude: ["@dimforge/rapier3d-compat"] },
});
