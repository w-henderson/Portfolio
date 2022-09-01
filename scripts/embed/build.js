const fs = require("fs");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { exit } = require("process");

const metadata = JSON.parse(fs.readFileSync("./metadata.json"));

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function dateformat(string) {
  let date = new Date(string);

  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

(async () => {
  const { stdout } = await exec("npm root --location=global");
  const puppeteer = require(`${stdout.trim()}/puppeteer`);

  let posts = metadata
    .data
    .find(x => x.type === "directory" && x.name === "blog")
    .children
    .filter(x => x.type === "markdown")
    .map(x => x.value);

  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  page.setViewport({
    width: 1200,
    height: 630
  });

  if (!fs.existsSync("./dist/images/blog")) {
    fs.mkdirSync("./dist/images/blog");
  }

  for (let post of posts) {
    let title = encodeURIComponent(post.title);
    let date = encodeURIComponent(dateformat(post.date));
    let slug = post.slug.split("/").pop();

    await page.goto(`file:///${__dirname}/template.html?title=${title}&date=${date}`);
    await page.screenshot({ path: `./dist/images/blog/${slug}.png` });
  }

  await browser.close();

  exit(0);
})();