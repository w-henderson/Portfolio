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

  return (
    <main className="blogPost">
      <Helmet>
        <title>{frontmatter.title} | William Henderson</title>
        <link rel="icon" href="/static/images/icon.png" />
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
            {frontmatter.date}
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
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;