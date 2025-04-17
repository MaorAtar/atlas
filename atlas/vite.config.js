import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/getUsers": {
        target: "https://api.clerk.dev/v1/users",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/getUsers/, ""),
        headers: {
          Authorization: `Bearer ${process.env.VITE_CLERK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    },
  },
});
