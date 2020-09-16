import * as React from "react";
import "../styles/Projects.css";

class Projects extends React.Component<
  {},
  { titles; currentProject; bookmarkRef }
> {
  constructor(props) {
    super(props);

    const bookmarkRef: React.RefObject<any> = React.createRef();

    this.state = {
      titles: [],
      currentProject: {},
      bookmarkRef,
    };
  }

  /*
   * Fetches the projects from the database and saves their titles in the state.
   */
  componentDidMount() {
    fetch("/getProjects", {
      method: "GET",
      headers: new Headers(),
    })
      .then((res) => res.json())
      .then((json) => {
        const titles = json.map((obj) => obj.title);
        this.setState({
          titles: titles,
          currentProject: {},
        });
        this.state.bookmarkRef.current.children[0].click();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*
   * Mouse Event listener that fetches tehe data of the selected project and updates the
   * current project in the state.
   */
  viewProject = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList[0] !== "projects-bookmark") {
      fetch(`/getProjectsByTitle/${(e.target as HTMLElement).innerText}`, {
        method: "GET",
        headers: new Headers(),
      })
        .then((res) => res.json())
        .then((json) => {
          Array.from(this.state.bookmarkRef.current.children as HTMLCollection)
            .find(
              (bookmarkElement) =>
                bookmarkElement.id ===
                `projects-bookmark__${this.state.currentProject.title}`
            )
            ?.classList.remove("projects-bookmark__name--highlight");

          this.setState({
            titles: this.state.titles,
            currentProject: json[0],
          });
          Array.from(this.state.bookmarkRef.current.children as HTMLCollection)
            .find(
              (bookmarkElement) =>
                bookmarkElement.id ===
                `projects-bookmark__${this.state.currentProject.title}`
            )
            ?.classList.add("projects-bookmark__name--highlight");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    const titleComponents = this.state.titles.map((title) => (
      <p
        key={title}
        className="projects-bookmark__name"
        id={`projects-bookmark__${title}`}
      >
        {title}
      </p>
    ));
    let tags: String = "";

    // Nicely align the tags of the currently selected project
    if (this.state.currentProject.tags !== undefined) {
      this.state.currentProject.tags.forEach((tag) => {
        tags += `, ${tag}`;
      });
    }

    return (
      <div className="projects-container" id="projects">
        <div
          className="projects-bookmark"
          onClick={this.viewProject}
          ref={this.state.bookmarkRef}
        >
          {titleComponents.reverse()}
        </div>
        <div className="projects-project">
          <h1 className="projects-project__title">
            {this.state.currentProject.title}
            <span id="status-development">
              {this.state.currentProject.status === "Development" &&
                " In Development"}
            </span>
          </h1>
          <p className="projects-project__desc">
            {this.state.currentProject.long_desc}
          </p>
          <p className="projects-project__tags">
            {tags !== "" && `Tags: ${tags.slice(2)}`}
          </p>
          <p className="projects-project__link-container">
            Github:{" "}
            <a
              href={this.state.currentProject.link}
              className="projects-project__link"
            >
              Link
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Projects;
