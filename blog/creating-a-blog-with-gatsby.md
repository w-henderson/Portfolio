---
slug: "/blog/creating-a-blog-with-gatsby"
date: "2022-05-25"
title: "Creating a blog with Gatsby"
description: "Creating a blog with Gatsby, using Markdown for the content, learning about GraphQL to query the data, and adding syntax highlighting with Prism."
---

With the A-level exam season in full swing, I've been finding more and more creative ways to procrastinate. I've long been thinking about creating a blog to share my thoughts about my computer science projects, and what better time to start it than just before my Further Mathematics Core Pure exam?

In this post, I'll be talking about what I learnt from building a blog using Gatsby. I won't cover the very basics - Gatsby's [Quick Start guide](https://www.gatsbyjs.com/docs/quick-start/) is an excellent resource for this - but I'll discuss the more specific choices I made and issues I encountered, and how I solved them.

## What is Gatsby?

I built my current portfolio almost a year ago using [Gatsby](https://www.gatsbyjs.com/), a React-based framework for building static websites. I initially chose the framework because the React documentation recommended it for static websites, but never really got to grips with it as I only used the most basic features for building the portfolio. I'm pretty familiar with React - I've used it for a number of projects - so I assumed Gatsby was just a static-content-optimised variation of it. When it came to building a blog, I did some research and found that Gatsby was a very popular choice, and since my portfolio already used it, I decided to integrate the two. 

## Gatsby and GraphQL

I knew from the start that I wanted to use Markdown to write my blog posts, so after some Googling I came across a useful article on how to add markdown pages to a Gatsby site: [Adding Markdown Pages](https://www.gatsbyjs.com/docs/how-to/routing/adding-markdown-pages/). This was very useful, and I was able to follow along without any issues.

However, I didn't realise how interconnected Gatsby and GraphQL are. I've never used GraphQL before, but I knew the very basics. I had a quick read of the Gatsby documentation's [GraphQL & Gatsby](https://www.gatsbyjs.com/docs/graphql/) guide to get up to scratch, and I then used it to render a list of blog posts on the front page of my site.

The query I used to get the appropriate data was:

```graphql
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
```

Frontmatter is the metadata stored at the top of the post's markdown file, which is dealt with by the [gatsby-transformer-remark](https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/) plugin. For example, this post's frontmatter looks like this:

```md
---
slug: "/blog/creating-a-blog-with-gatsby"
date: "2022-05-25"
title: "Creating a blog with Gatsby"
---
```

## Syntax Highlighting

You probably noticed that the GraphQL query above is syntax-highlighted. This is of course a very important feature of a programming blog, since embedded code snippets are often a key part of a post. To achieve this, I used the [gatsby-remark-highlight-code](https://www.gatsbyjs.com/plugins/gatsby-remark-highlight-code/) plugin, which is powered by [Prism](https://prismjs.com/)'s syntax highlighting engine.

I found this fairly simple to set up, but I had some trouble with the styling as it turned out that my Sass stylesheet was getting mixed up with that of the plugin, which caused the code to look very strange. I ended up removing my styling for the code and instead using CSS variables to control different aspects of the styling. This worked very well.

## Conclusion

I really like Gatsby's data-oriented approach to building websites, and I'm very pleased with how my blog has turned out. Prior to this post, I thought Gatsby was just a static-content-oriented React framework and GraphQL was just a declarative replacement for REST APIs, but in creating this blog, I found that they're both a lot more flexible than I had first assumed. GraphQL especially piqued my interest, and it's something I'm certainly going to be looking into for future projects.

One final word - I'm planning to write a blog post every week or two, but we'll see how it goes in the future. If this post was useful, please consider sharing it with other people who might be interested in it!