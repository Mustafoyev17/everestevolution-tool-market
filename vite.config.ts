import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

<<<<<<< HEAD
=======
// https://vitejs.dev/config/
>>>>>>> 916dbd8d51887cb3c9e6b1578b403ca73b819301
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
<<<<<<< HEAD
  preview: {
    host: "::",
    port: Number(process.env.PORT) || 8080,
  },
=======
>>>>>>> 916dbd8d51887cb3c9e6b1578b403ca73b819301
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
