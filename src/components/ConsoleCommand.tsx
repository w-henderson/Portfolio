import React from "react";

interface ConsoleCommandProps {
  command?: string,
  cursor?: boolean,
  showFull: boolean,
}

class ConsoleCommand extends React.Component<ConsoleCommandProps> {
  render() {
    if (this.props.showFull) {
      return (
        <div style={{ marginBottom: "1em" }}>
          <span style={{ color: "#e08374" }}>guest@portfolio</span>
          <span style={{ color: "#7f5c52" }}>:</span>
          <span style={{ color: "#e08374" }}>~</span>
          <span style={{ color: "#7f5c52" }}>$</span>

          {this.props.cursor === true &&
            <div className="cursor"></div>
          }

          <span> {this.props.command}</span><br />
          <div>{this.props.children}</div>
        </div>
      )
    } else {
      return (
        <div style={{ marginBottom: "1em" }}>
          <span style={{ color: "#e08374" }}>$</span>

          {this.props.cursor === true &&
            <div className="cursor"></div>
          }

          <span> {this.props.command}</span><br />
          <div>{this.props.children}</div>
        </div>
      )
    }
  }
}

export default ConsoleCommand;