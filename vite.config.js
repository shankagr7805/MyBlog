import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, "node_modules/tinymce"),
          dest: "tinymce",
        },
        {
          src: path.resolve(__dirname, "node_modules/tinymce/tinymce.min.js"),
          dest: "tinymce",
        },
        {
          src: path.resolve(__dirname, "node_modules/tinymce/skins"),
          dest: "tinymce",
        },
        {
          src: path.resolve(__dirname, "node_modules/tinymce/themes"),
          dest: "tinymce",
        },
        {
          src: path.resolve(__dirname, "node_modules/tinymce/icons"),
          dest: "tinymce",
        },
        {
          src: path.resolve(__dirname, "node_modules/tinymce/plugins"),
          dest: "tinymce",
        },
        {
          src: path.resolve(__dirname, "node_modules/tinymce/models"),
          dest: "tinymce",
        },
      ],
    }),
  ],
});
