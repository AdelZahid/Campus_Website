import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  server: {
    hmr: {
      port: 3157, // Make sure this matches your setup
      host: "localhost",
    },
  },
  plugins: [react()],
  //plugins: [tailwindcss()],
});
