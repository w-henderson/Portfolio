import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import "../styles/index.scss";

import {
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon
} from "@material-ui/icons";

import Console from "../components/Console";
import ConsoleCommand from "../components/ConsoleCommand";
import Project from "../components/Project";
import Contact from "../components/Contact";
import PostCards from "../components/PostCards";

const PROJECTS: ProjectData[] = require("../projects.json");

interface IndexState {
  width: number,
  height: number,
  additionalSkills: boolean
}

type IndexProps = {
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
          },
          timeToRead: number
        }
      }[]
    }
  }
}

class Index extends React.Component<IndexProps, IndexState> {
  projectsRef: React.RefObject<HTMLElement>;
  contactRef: React.RefObject<HTMLElement>;

  constructor(props) {
    super(props);
    this.projectsRef = React.createRef();
    this.contactRef = React.createRef();
    this.state = {
      width: 1920,
      height: 1080,
      additionalSkills: false
    }
  }

  componentDidMount() {
    window.addEventListener("resize", (() => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }).bind(this));

    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });

    switch (window.location.hash) {
      case "#projects": return this.projectsRef.current!.scrollIntoView();
      case "#contact": return this.contactRef.current!.scrollIntoView();
    }
  }

  render() {
    return (
      <main>
        <Helmet htmlAttributes={{ lang: "en" }}>
          <title>Portfolio | William Henderson</title>
          <link rel="icon" href="/images/icon.png" />
          <meta name="description" content="Hello, I'm William Henderson. I'm a Software Developer from the United Kingdom with a passion for building efficient, robust and beautiful applications in a variety of fields." />
        </Helmet>

        <nav>
          <span>W</span>
          <a href="#projects" onClick={() => this.projectsRef.current!.scrollIntoView({ behavior: "smooth" })}>Projects</a>
          <a href="#contact" onClick={() => window.scrollTo({ behavior: "smooth", top: document.body.scrollHeight })}>Contact</a>
          <a href="/blog/">Blog</a>
        </nav>

        <header>
          <div>Hello, I'm</div>

          <h1>
            <span>William</span>
            <span>Henderson.</span>
          </h1>

          <div>
            I'm a Software Developer from the United Kingdom with a passion for building efficient, robust and beautiful applications in a variety of fields.
          </div>
        </header>

        <Console>
          <ConsoleCommand
            className="mainCommand"
            command="./aboutme"
            showFull={this.state.width > 600}>

            <img src="/images/icon.svg" alt="ASCII art" />

            <div>
              <p>
                <span><b>WILLIAM HENDERSON</b></span>
              </p>

              <p>
                <span>Location</span>: Exeter, United Kingdom
              </p>

              <p>
                <span>Skills</span>: Rust, React, TypeScript,
                <span
                  className="expandButton"
                  onClick={() => this.setState(state => { return { ...state, additionalSkills: !state.additionalSkills } })}>

                  {this.state.additionalSkills ? "-" : "+"}
                </span>

                <span className={this.state.additionalSkills ? "additionalSkills show" : "additionalSkills"}>
                  JavaScript, HTML/CSS/Sass, Python, Git/GitHub, SQL, Docker
                </span>
              </p>

              <p>
                <span>Education</span>: Ten level 9 GCSEs including Mathematics, Computer Science and English Language
              </p>

              <p>
                <span>GitHub</span>: <a href="https://github.com/w-henderson">w-henderson</a><br />
                <span>Email</span>: <a href="mailto:hello@whenderson.dev">hello@whenderson.dev</a><br />
                <span>Twitter</span>: <a href="https://twitter.com/hxswell">@hxswell</a><br />
              </p>
            </div>
          </ConsoleCommand>

          <ConsoleCommand
            cursor={true}
            showFull={this.state.width > 600} />
        </Console>

        <section className="projects" ref={this.projectsRef}>
          <h1>Projects</h1>

          <div>
            Over the course of more than a decade, I've worked on a diverse array of projects, from websites and mobile apps to databases and web servers.
          </div>

          {PROJECTS.map((project, index) =>
            <Project
              project={project}
              width={this.state.width}
              key={index} />
          )}
        </section>

        <section className="blogPosts">
          <h1>Blog</h1>

          <div>
            Here are my most recent blog posts. You can find more of my thoughts and ideas on the <a href="/blog/">blog page</a>.
          </div>

          <PostCards posts={this.props.data.allMarkdownRemark.edges.slice(0, 3).map(post => {
            return {
              title: post.node.frontmatter.title,
              date: post.node.frontmatter.date,
              slug: post.node.frontmatter.slug,
              excerpt: post.node.excerpt,
              timeToRead: post.node.timeToRead
            }
          })} />
        </section>

        <section className="contact" ref={this.contactRef}>
          <h1>Contact</h1>

          <div>If you want any more information, or just a chat, please send me a message through one of the following platforms.</div>

          <div>
            <Contact text="w-henderson" link="https://github.com/w-henderson">
              <GitHubIcon />
            </Contact>

            <Contact text="hello@whenderson.dev" link="mailto:hello@whenderson.dev">
              <EmailIcon />
            </Contact>

            <Contact text="@hxswell" link="https://twitter.com/hxswell">
              <TwitterIcon />
            </Contact>
          </div>
        </section>
      </main >
    )
  }
}

export default Index;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 3) {
      edges {
        node {
          id
          excerpt(pruneLength: 100)
          timeToRead
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