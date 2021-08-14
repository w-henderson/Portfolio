import React from "react";
import "../styles/Console.scss";

class Console extends React.Component {
  render() {
    return (
      <div className="console">
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Console;