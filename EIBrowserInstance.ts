import puppeteer, { Browser, Page } from "puppeteer"

export default class EIBrowserInstance {
  private instance?: Browser
  private page?: Page

  private url = "https://www.naver.com/"

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public async run() {
    await this.launch()
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

  public async screenshot() {
    await this.page?.screenshot({ path: "./screenshot.png" })
    console.log(
      `Screenshot has placed! ${this.url} ${new Date().toISOString()}`
    )
  }

  public async destroy() {
    await this.instance?.close()
  }
}
