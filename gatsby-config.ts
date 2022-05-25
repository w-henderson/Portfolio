import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Portfolio | William Henderson`,
    siteUrl: `https://whenderson.dev`
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-highlight-code",
            options: {
              terminal: "none",
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "markdown-pages",
        "path": "./blog/"
      },
    }
  ]
};

export default config;
