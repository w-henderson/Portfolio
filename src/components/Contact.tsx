import React from "react";
import "../styles/Contact.scss";

interface ContactProps {
  text: string,
  link: string
}

class Contact extends React.Component<ContactProps> {
  render() {
    return (
      <div className="contact">
        <div className="icon">
          {this.props.children}
        </div>

        <div className="text">
          <a href={this.props.link} rel="noreferrer" target="_blank">
            {this.props.text}
          </a>
        </div>
      </div>
    )
  }
}

export default Contact;