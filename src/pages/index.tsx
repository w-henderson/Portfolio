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
          <ConsoleCommand command="example command">
            example response
          </ConsoleCommand>
        </Console>
      </main>
    )
  }
}

export default Index;