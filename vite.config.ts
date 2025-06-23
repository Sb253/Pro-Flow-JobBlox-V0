import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"
import path from "path"

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [
      react({
        // Enable React Fast Refresh
        fastRefresh: true,
      }),
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        },
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
        manifest: {
          name: "JobBlox CRM",
          short_name: "JobBlox",
          description: "Professional CRM for Service Businesses",
          theme_color: "#ffffff",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@/components": path.resolve(__dirname, "./src/components"),
        "@/lib": path.resolve(__dirname, "./src/lib"),
        "@/types": path.resolve(__dirname, "./src/types"),
        "@/config": path.resolve(__dirname, "./src/config"),
        "@/utils": path.resolve(__dirname, "./src/utils"),
        "@/hooks": path.resolve(__dirname, "./src/hooks"),
        "@/services": path.resolve(__dirname, "./src/services"),
        "@/contexts": path.resolve(__dirname, "./src/contexts"),
        "@/pages": path.resolve(__dirname, "./src/pages"),
        "@/assets": path.resolve(__dirname, "./src/assets"),
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
    server: {
      port: 3000,
      host: true,
      open: true,
      cors: true,
      // Enable HMR
      hmr: {
        overlay: true,
      },
      // Proxy API requests in development
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:3001",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      target: "esnext",
      outDir: "dist",
      sourcemap: command === "serve",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu"],
            utils: ["lodash-es", "date-fns", "clsx"],
            query: ["@tanstack/react-query"],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom", "@tanstack/react-query", "zustand", "zod"],
    },
    // Enable CSS source maps in development
    css: {
      devSourcemap: true,
    },
  }
})
