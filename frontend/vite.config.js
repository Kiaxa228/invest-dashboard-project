import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactSupport from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          [
            "@babel/plugin-proposal-class-properties",
            { loose: true },
          ],
            ["@babel/plugin-syntax-class-properties"],
        ],

      },
    })
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  }
  }
);
