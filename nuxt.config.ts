export default defineNuxtConfig({
  app: {
    head: {
      title: "Go Fly!",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "white" },
        { name: "author", content: "Alberto Rico" },
        {
          name: "google-site-verification",
          content: "nc0pKffQdhm679g_eXEQhjK-NzBM8ZbyFQLR9ZMeJtc",
        },
      ],
    },
  },
  css: ["@/assets/main.scss"],
  modules: [
    "nuxt-icon",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "nuxt3-leaflet",
    "@bootstrap-vue-next/nuxt",
    "@nuxtjs/google-fonts",
    "@nuxtjs/color-mode",
  ],
  pwa: {
    registerType: "prompt",
    manifest: {
      name: "Go Fly!",
      description: "A random flight generator",
      theme_color: "white",
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
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    client: {
      installPrompt: true,
    },
  },
  googleFonts: {
    families: {
      B612: [400, 700],
      Roboto: [400, 500, 700],
    },
  },
  colorMode: {
    dataValue: "bs-theme",
    storageKey: "nuxt-color-mode",
  },
});
