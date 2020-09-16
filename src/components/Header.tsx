import * as React from "react";
import "../styles/Header.css";

class Header extends React.Component<{ buttons; currentSlide }, { tabs }> {
  constructor(props: any) {
    super(props);

    const tabsHome: React.RefObject<any> = React.createRef();
    const tabsAbout: React.RefObject<any> = React.createRef();
    const tabsProjects: React.RefObject<any> = React.createRef();
    const tabsContact: React.RefObject<any> = React.createRef();

    this.state = {
      tabs: [tabsHome, tabsAbout, tabsProjects, tabsContact],
    };
  }
  /*
   * Mouse event listener that makes the navbar tabs switch between the pages.
   */
  navbarSwitchPages = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).id !== "header-container" ||
      (e.target as HTMLElement).id !== "header-navbar"
    ) {
      if ((e.target as HTMLElement).id === "header-logo") {
        this.props.buttons[0].current.click();
      } else if ((e.target as HTMLElement).id === "about-link") {
        this.props.buttons[1].current.click();
      } else if ((e.target as HTMLElement).id === "projects-link") {
        this.props.buttons[2].current.click();
      } else if ((e.target as HTMLElement).id === "contact-link") {
        this.props.buttons[3].current.click();
      }
    }
  };

  render() {
    return (
      <div onClick={this.navbarSwitchPages} className="header-container">
        <a href="#home" ref={this.state.tabs[0]}>
          <img src={require("../images/logo.svg")} alt="" id="header-logo" />
        </a>
        <div className="header-navbar">
          <a
            href="#about"
            ref={this.state.tabs[1]}
            className={
              this.props.currentSlide !== 1
                ? "header-navbar__link"
                : "header-navbar__link header-navbar__link--highlight"
            }
            id="about-link"
          >
            About
          </a>
          <a
            href="#projects"
            ref={this.state.tabs[2]}
            className={
              this.props.currentSlide !== 2
                ? "header-navbar__link"
                : "header-navbar__link header-navbar__link--highlight"
            }
            id="projects-link"
          >
            Projects
          </a>
          <a
            href="#contact"
            ref={this.state.tabs[3]}
            style={{ borderRight: "none", color: "var(--color-2)" }}
            className={
              this.props.currentSlide !== 3
                ? "header-navbar__link"
                : "header-navbar__link header-navbar__link--highlight"
            }
            id="contact-link"
          >
            Contact
          </a>
        </div>
      </div>
    );
  }
}

export default Header;
