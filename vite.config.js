import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    host: true,
    port: 5173,

    proxy: {
      "/dev": {
        target: "https://dev-1.modernio.ir",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});