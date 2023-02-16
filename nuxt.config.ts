/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-extra-semi */
import { OutputOptions } from "rollup"
import eslintPlugin from "vite-plugin-eslint"
import EIBrowserInstance from "./EIBrowserInstance"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["bootstrap-vue-next/nuxt"],
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "bootstrap-icons/font/bootstrap-icons.css"
  ],
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
          bootstrapVue: ["bootstrapVue"],
          bootstrapVueIcons: ["bootstrap-vue/src/icons"]
        }
      }
    },
    "nitro:init": async () => {
      /* ;(async () => {
        const instance = new EIBrowserInstance()
        /* await instance.run()

        await instance.screenshot() 
      })() */

      console.log("tests")
    }
  }
})
