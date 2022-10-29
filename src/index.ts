import puppeteer from "puppeteer";

async function main() {
  const browser = await puppeteer.launch({ headless: false, devtools: false });
  const page = await browser.newPage();
  await page.goto("https://www.yuque.com/weijin_is_wiki/ykf0s9/fxbfgc", {
    waitUntil: "networkidle0",
  });
  await page.evaluate(async () => {
    const { scrollHeight } = document.body;
    const STEP = 1000;

    let n = Math.ceil(scrollHeight / STEP);
    while (n--) {
      window.scrollBy(0, STEP);
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(true);
        }, 1000)
      );
    }
  });
  await page.pdf({ path: "dist/1.pdf" });
  await browser.close();
}

main();
