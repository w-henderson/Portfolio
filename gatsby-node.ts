const fs = require("fs");
const puppeteer = require("puppeteer");

exports.onPostBuild = async ({ graphql }) => {
  await graphql(`
    {
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/blog/" } }
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    }
  `).then(async result => {
    let posts = result.data.posts.edges.map(({ node }) => node);
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    page.setViewport({
      width: 1200,
      height: 630
    });

    if (!fs.existsSync("./public/static/images/blog")) {
      fs.mkdirSync("./public/static/images/blog");
    }

    for (let post of posts) {
      let title = encodeURIComponent(post.frontmatter.title);
      let date = encodeURIComponent(post.frontmatter.date);
      let slug = post.frontmatter.slug.split("/").pop();

      await page.goto(`file:///${__dirname}/images/embed.html?title=${title}&date=${date}`);
      await page.screenshot({ path: `./public/static/images/blog/${slug}.png` });
    }
  })
}