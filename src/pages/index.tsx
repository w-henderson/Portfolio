import React from "react";
import { Helmet } from "react-helmet";
import "../styles/index.scss";

import Console from "../components/Console";
import ConsoleCommand from "../components/ConsoleCommand";

class Index extends React.Component {
  render() {
    return (
      <main>
        <Helmet>
          <title>Portfolio | William Henderson</title>
        </Helmet>

        <nav>
          <a href="#">Projects</a>
          <a href="#">Contact</a>
        </nav>

        <header>
          <div>Hello, I'm</div>
          <h1>
            <span>William</span>
            <span>Henderson.</span>
          </h1>
        </header>

        <Console>
          <ConsoleCommand command="cat location.txt">
            Exeter, United Kingdom
          </ConsoleCommand>

          <ConsoleCommand command="cat contact.json">
            ["<a href="mailto:william-henderson@outlook.com">william-henderson@outlook.com</a>",
            "<a href="https://github.com/w-henderson">GitHub</a>",
            "<a href="https://twitter.com/hxswell">Twitter</a>"]
          </ConsoleCommand>

          <ConsoleCommand command="cat skills.json">
            ["Rust", "React", "JavaScript", "TypeScript", "Sass", "Python", "Git/GitHub", "Firebase", "Google Cloud Platform"]
          </ConsoleCommand>

          <ConsoleCommand command="cat education.txt">
            Ten level 9 GCSEs including Mathematics, English Language and Computer Science
          </ConsoleCommand>

          <ConsoleCommand cursor={true} />
        </Console>
      </main>
    )
  }
}

export default Index;