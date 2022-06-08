import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

import "../styles/BlogPost.scss";

import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
deckDeckGoHighlightElement();

export default function Template({
  data,
}) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const pathToEmbed = `https://whenderson.dev/images/blog/${frontmatter.slug.split("/").pop()}.png`;

  return (
    <main className="blogPost">
      <Helmet>
        <title>{frontmatter.title} | William Henderson</title>
        <link rel="icon" href="/images/icon.png" />

        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://whenderson.dev${frontmatter.slug}/`} />
        <meta property="og:site_name" content="William Henderson" />
        <meta property="og:image" content={pathToEmbed} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="description" content={frontmatter.description} />

        <meta property="article:author" content="William Henderson" />
        <meta property="article:published_time" content={frontmatter.metaDate} />
        <meta property="article:modified_time" content={frontmatter.metaDate} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@w-henderson" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={pathToEmbed} />
        <meta name="twitter:url" content={`https://whenderson.dev${frontmatter.slug}/`} />
      </Helmet>

      <nav>
        <span><a href="/">W</a></span>
        <a href="/#projects">Projects</a>
        <a href="/#contact">Contact</a>
        <a href="/blog/">Blog</a>
      </nav>

      <div>
        <header>
          <h1>
            <span>{frontmatter.title}</span>
          </h1>

          <div>
            {frontmatter.displayDate}
          </div>
        </header>

        <div
          className="post"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </main>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        displayDate: date(formatString: "MMMM DD, YYYY")
        metaDate: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
        slug
        title
        description
      }
    }
  }
`;