import * as React from "react";
import "../styles/App.css";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";

class App extends React.Component<{}, { currentSlide; buttons; skills }> {
  constructor(props: any) {
    super(props);

    const skills: String[] = [
      "Javascript",
      "Typescript",
      "React",
      "HTML",
      "CSS",
      "Java",
      "C#",
      "Python",
      "MySQL",
      "MongoDB",
      "Git",
    ];

    const buttonsHome: React.RefObject<any> = React.createRef();
    const buttonsAbout: React.RefObject<any> = React.createRef();
    const buttonsProjects: React.RefObject<any> = React.createRef();
    const buttonsContact: React.RefObject<any> = React.createRef();

    this.state = {
      currentSlide: 0,
      buttons: [buttonsHome, buttonsAbout, buttonsProjects, buttonsContact],
      skills: skills,
    };
  }

  componentDidMount() {
    const vh: Number = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    document.addEventListener("keydown", this.scrollButtonKeypress);
    window.onresize = this.screenResize;
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.scrollButtonKeypress);
  }

  /*
   * Repositions the currently viewed component when the screen is resized.
   */
  screenResize = () => {
    const vh: Number = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    this.state.buttons[this.state.currentSlide].current.click();
  };

  /*
   * Key event listener that adds arrow key functionality for navigating the website pages.
   */
  scrollButtonKeypress = (e: KeyboardEvent) => {
    const currentSlide = this.state.currentSlide;
    if (e.key === "ArrowRight") {
      if (currentSlide < 3) {
        this.state.buttons[currentSlide + 1].current.click();
      }
    } else if (e.key === "ArrowLeft") {
      if (currentSlide > 0) {
        this.state.buttons[currentSlide - 1].current.click();
      }
    }
  };

  /*
   * Event Listener that makes the app-buttons move between pages.
   */
  scrollButtonClick = (e: any) => {
    if (e.target.classList[0] === "button--circular") {
      const slideIndex = Number(e.target.id.slice(8));

      this.state.buttons[this.state.currentSlide].current.classList.remove(
        "button--circular--selected"
      );

      this.setState({ currentSlide: slideIndex });

      this.state.buttons[slideIndex].current.classList.add(
        "button--circular--selected"
      );
    }
  };

  render() {
    return (
      <div className="app-container">
        <Header buttons={this.state.buttons} currentSlide={this.state.currentSlide} />
        <div className="app">
          <Home />
          <About skills={this.state.skills} />
          <Projects />
          <Contact />
          <div onClick={this.scrollButtonClick} className="app-buttons">
            <a
              href="#home"
              className="button--circular button--circular--selected"
              id="buttons-0"
              ref={this.state.buttons[0]}
            >
              {" "}
            </a>
            <a
              href="#about"
              className="button--circular"
              id="buttons-1"
              ref={this.state.buttons[1]}
            >
              {" "}
            </a>
            <a
              href="#projects"
              className="button--circular"
              id="buttons-2"
              ref={this.state.buttons[2]}
            >
              {" "}
            </a>
            <a
              href="#contact"
              className="button--circular"
              id="buttons-3"
              ref={this.state.buttons[3]}
            >
              {" "}
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
