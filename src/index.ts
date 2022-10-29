import puppeteer from "puppeteer";
import { program } from "commander";
import fs from "fs";

import type { Page } from "puppeteer";

const defaultUrl = "https://www.yuque.com/weijin_is_wiki/ykf0s9/fxbfgc";

program.option("-p --path <char>", "add url path", defaultUrl);
program.parse();

const { path: urlPath } = program.opts();

/**
 *
 * @param page puppeteer instance property `puppeteer.Page`
 * @param url `string`
 */
async function generatePDF(page: Page, url: string) {
  await page.goto(url, {
    waitUntil: "networkidle0",
  });
  const resultsSelector = "#article-title";
  await page.waitForSelector(resultsSelector);
  const title = await page.evaluate((resultsSelector) => {
    return document.querySelector(resultsSelector)?.textContent;
  }, resultsSelector);

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
  if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist");
  }
  await page.pdf({ path: `dist/${title}.pdf` });
}

/**
 * startup
 */
async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await generatePDF(page, urlPath);
  await browser.close();
}

main();
