import React from "react";
import { Helmet } from "react-helmet";
import "../styles/index.scss";

import Console from "../components/Console";
import ConsoleCommand from "../components/ConsoleCommand";
import Project from "../components/Project";

const PROJECTS: ProjectData[] = require("../projects.json");

interface IndexState {
  width: number,
  height: number
}

class Index extends React.Component<{}, IndexState> {
  constructor(props) {
    super(props);
    this.state = {
      width: 1920,
      height: 1080
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
  }

  render() {
    return (
      <main>
        <Helmet>
          <title>Portfolio | William Henderson</title>
          <link rel="icon" href="/static/images/icon.png" />
        </Helmet>

        <nav>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        <header>
          <div>Hello, I'm</div>
          <h1>
            <span>William</span>
            <span>Henderson.</span>
          </h1>
        </header>

        <Console>
          <ConsoleCommand
            command="cat location.txt"
            showFull={this.state.width > 600} >
            Exeter, United Kingdom
          </ConsoleCommand>

          <ConsoleCommand
            command="cat contact.json"
            showFull={this.state.width > 600} >
            ["<a href="mailto:william-henderson@outlook.com">william-henderson@outlook.com</a>",
            "<a href="https://github.com/w-henderson">GitHub</a>",
            "<a href="https://twitter.com/hxswell">Twitter</a>"]
          </ConsoleCommand>

          <ConsoleCommand
            command="cat skills.json"
            showFull={this.state.width > 600} >
            ["Rust", "React", "JavaScript", "TypeScript", "Sass", "Python", "Git/GitHub", "Firebase", "Google Cloud Platform"]
          </ConsoleCommand>

          <ConsoleCommand
            command="cat education.txt"
            showFull={this.state.width > 600} >
            Ten level 9 GCSEs including Mathematics, English Language and Computer Science
          </ConsoleCommand>

          <ConsoleCommand
            cursor={true}
            showFull={this.state.width > 600} />
        </Console>

        <section className="projects">
          <h1 ref="projects">Projects</h1>

          {PROJECTS.map((project, index) =>
            <Project project={project} key={index} />
          )}
        </section>
      </main>
    )
  }
}

export default Index;