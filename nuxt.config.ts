/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-extra-semi */
import { OutputOptions } from "rollup"
import eslintPlugin from "vite-plugin-eslint"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    plugins: ["@/plugins/nitro_puppeteer"]
  },
  build: {
    transpile: ["wait"]
  },
  vite: {
    plugins: [eslintPlugin()]
  },
  hooks: {
    "vite:extendConfig"(clientConfig, { isClient }) {
      if (isClient) {
        ;(
          clientConfig.build!.rollupOptions!.output as OutputOptions
        ).manualChunks = {
          "@fortawesome/vue-fontawesome": ["@fortawesome/vue-fontawesome"],
          "@fortawesome/fontawesome-svg-core": [
            "@fortawesome/fontawesome-svg-core"
          ],
          "@fortawesome/free-solid-svg-icons": [
            "@fortawesome/free-solid-svg-icons"
          ],
          "@fortawesome/free-regular-svg-icons": [
            "@fortawesome/free-regular-svg-icons"
          ],
          "@fortawesome/free-brands-svg-icons": [
            "@fortawesome/free-brands-svg-icons"
          ]
        }
      }
    }
  }
})
