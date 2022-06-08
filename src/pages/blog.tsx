import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

import PostCards from "../components/PostCards";
import Posts from "../components/Posts";

type BlogProps = {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          id: string,
          excerpt: string,
          frontmatter: {
            date: string,
            slug: string,
            title: string
          }
        }
      }[]
    }
  }
}

class Blog extends React.Component<BlogProps> {
  render() {
    return (
      <main>
        <Helmet>
          <title>Blog | William Henderson</title>
          <link rel="icon" href="/images/icon.png" />
        </Helmet>

        <nav>
          <span><a href="/">W</a></span>
          <a href="/#projects">Projects</a>
          <a href="/#contact">Contact</a>
          <a href="/blog/">Blog</a>
        </nav>

        <header style={{ marginBottom: "96px" }}>
          <h1 className="veryBig">
            <span>Blog.</span>
          </h1>

          <div>
            Read my thoughts on the latest technologies and trends. I'll be sharing insights into my current projects as well as discussing the latest developments in the industry.
          </div>
        </header>

        <section>
          <h1 className="darker">Recent Posts</h1>

          <PostCards posts={this.props.data.allMarkdownRemark.edges.slice(0, 3).map(post => {
            return {
              title: post.node.frontmatter.title,
              date: post.node.frontmatter.date,
              slug: post.node.frontmatter.slug,
              excerpt: post.node.excerpt
            }
          })} />
        </section>

        <section>
          <h1 className="darker">All Posts</h1>

          <Posts posts={this.props.data.allMarkdownRemark.edges.map(post => {
            return {
              title: post.node.frontmatter.title,
              date: post.node.frontmatter.date,
              slug: post.node.frontmatter.slug,
              excerpt: post.node.excerpt
            }
          })} />
        </section>
      </main>
    )
  }
}

export default Blog;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 100)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
          }
        }
      }
    }
  }
`