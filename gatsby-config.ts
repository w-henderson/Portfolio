import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Portfolio | William Henderson`,
    siteUrl: `https://whenderson.dev`
  },
  plugins: ["gatsby-plugin-sass", "gatsby-transformer-remark", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "markdown-pages",
      "path": "./blog/"
    },
  }]
};

export default config;
