import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow external access (required for CodeSandbox)
    port: 5173, // optional, default Vite port
    strictPort: false, // allows fallback if port is taken
    allowedHosts: [".csb.app"], // allow all CodeSandbox hosts
  },
});
