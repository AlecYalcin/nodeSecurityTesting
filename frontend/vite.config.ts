import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    host: "0.0.0.0",
    // proxy: {
    //   "": {
    //     target: "http://localhost:3000", // Endereço do backend
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
});
