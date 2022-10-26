import puppeteer from "puppeteer";

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.yuque.com/weijin_is_wiki/ykf0s9/fxbfgc");
  await page.pdf({ path: "dist/1.pdf" });
  await browser.close();
}

main();
