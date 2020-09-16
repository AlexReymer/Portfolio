import * as React from "react";
import "../styles/Footer.css";

class Footer extends React.Component<{}, {}> {
  render() {
    return (
      <div className="footer">
        <div className="footer-element">
          <i className="icon icon-doc"></i>
          <a
            href={require("../resources/alex_reymer_resume.pdf")}
            className="footer-element__text footer-element__link"
          >
            Resume
          </a>
        </div>
        <div className="footer-element">
          <i className="icon icon-mail"></i>
          <a
            href="mailto:alexreymer@gmail.com"
            className="footer-element__text footer-element__link"
          >
            Gmail
          </a>
        </div>
        <div className="footer-element">
          <i className="icon icon-git"></i>
          <a
            href="https://github.com/AlexReymer"
            className="footer-element__text footer-element__link"
          >
            Github
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
