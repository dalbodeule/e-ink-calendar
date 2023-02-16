import puppeteer, { Browser, Page } from "puppeteer"
import { NitroApp } from "nitropack"
import wait from "wait"

export default defineNitroPlugin((nitroApp) => {
  // eslint-disable-next-line @typescript-eslint/no-extra-semi
  ;(async () => {
    const instance = new EIBrowserInstance(nitroApp)

    await instance.run()
    await instance.destroy()
  })()
})

class EIBrowserInstance {
  private instance?: Browser
  private page?: Page

  private nitroApp: NitroApp

  private url = "https://www.naver.com/"

  constructor(nitroApp: NitroApp) {
    this.nitroApp = nitroApp
  }

  public async run() {
    await this.launch()

    await wait(1000)

    await this.screenshot()

    await this.destroy()
  }

  private async launch() {
    if (this.instance) {
      return true
    } else {
      this.instance = await puppeteer.launch({
        channel: "chrome",
        headless: true
      })
      this.page = await this.instance.newPage()

      await this.page.goto(this.url)
      await this.page.setViewport({ width: 1920, height: 1080 })

      this.instance.on("disconnected", () => {
        this.launch()
      })
    }
  }

  private async screenshot() {
    await this.page?.screenshot({ path: "./screenshot.png" })
    console.log(
      `Screenshot has placed! ${this.url} ${new Date().toISOString()}`
    )
  }

  public async destroy() {
    await this.instance?.close()
  }
}
