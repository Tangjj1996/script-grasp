import puppeteer from "puppeteer";
import ora from "ora";
import fs from "fs";
import chalk from "chalk";
import { program } from "commander";

import type { Page } from "puppeteer";
import type { Ora } from "ora";

const defaultUrl = "https://www.yuque.com/weijin_is_wiki/ykf0s9/fxbfgc";

program.option("-p, --path <char>", "add url path", defaultUrl);
program.option("-d, --directory <char>", "add store directory", "build");
program.parse();

let spinner: Ora;

const { path: urlPath, directory } = program.opts();

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

  spinner.text = `文章标题是[${chalk.green(title)}]`;

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  await page.pdf({ path: `${directory}/${title}.pdf` });
  spinner.succeed();
}

/**
 * startup
 */
async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  spinner = ora(
    `正在进行网页转pdf, 当前url [${chalk.green(
      urlPath
    )}] 当前存放地址 [${chalk.green(directory)}]`
  ).start();
  await generatePDF(page, urlPath);
  await browser.close();
}

main();
