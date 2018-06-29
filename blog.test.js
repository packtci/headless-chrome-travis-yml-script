"use strict";

const puppeteer = require("puppeteer");

let page;
let browser;
const webpage = "http://www.marcelbelmont.com/";
const width = 1440;
const height = 900;
const myBlog = "blog.png"

describe("Marcel Belmont Blog", () => {

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });

  afterAll(async () => {
    await page.screenshot({path: myBlog});
    browser.close();
  });

  it("Should have a biography id with test", async () => {
    await page.goto(webpage);
    const textContent = await page.evaluate(() => document.querySelector("#biography").textContent);
    expect(textContent).toEqual("Biography");
  });

  it("Should have an interests section", async () => {
    await page.goto(webpage);
    const testContent = await page.evaluate(() => document.querySelector(".ul-interests").children[1].textContent)
    expect(testContent).toEqual("Testing");
  });
});