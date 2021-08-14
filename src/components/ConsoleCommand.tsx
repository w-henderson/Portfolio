import React from "react";

interface ConsoleCommandProps {
  command: string
}

class ConsoleCommand extends React.Component<ConsoleCommandProps> {
  render() {
    return (
      <div>
        <span style={{ color: "#e08374" }}>guest@portfolio</span>
        <span style={{ color: "#7f5c52" }}>:</span>
        <span style={{ color: "#e08374" }}>~</span>
        <span style={{ color: "#7f5c52" }}>$</span>

        <span> {this.props.command}</span><br />

        {this.props.children}
      </div>
    )
  }
}

export default ConsoleCommand;