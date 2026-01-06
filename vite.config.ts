import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: { port: 3000 },
  plugins: [react(), tailwindcss(), tsconfigPaths()],
});
