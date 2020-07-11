import * as React from 'react'
import '../styles/Projects.css'
import '../styles/Slider.css'


class Projects extends React.Component<{}, { titles, currentProject }>{    
    constructor(props){
        super(props)
        this.state = {  
            titles: [],
            currentProject: {}
        }
    }
    
    /*
     * Fetches the projects from the database and saves their titles in the state.
     */
    componentDidMount(){
        fetch('/getProjects', {
            method: 'GET',
            headers: new Headers(),
        }).then(res => res.json())
            .then(json => {
                const titles = json.map(obj => obj.title)
                this.setState({
                    titles: titles,
                    currentProject: this.state.currentProject
                })
            })
    }
    
    /*
     * Mouse Event listener that fetches tehe data of the selected project and updates the
     * current project in the state.
     */
    viewProject = (e: React.MouseEvent) => {        
        if ((e.target as HTMLElement).classList[0] !== 'projects-bookmark'){
            fetch(`/getProjectsByTitle/${(e.target as HTMLElement).innerText}`, {
                method: 'GET',
                headers: new Headers()
            }).then(res => res.json())
                .then(json => {
                    document.getElementById(`projects-bookmark__${this.state.currentProject.title}`)?.classList.remove('projects-bookmark__name--highlight')
                    this.setState({
                        titles: this.state.titles,
                        currentProject: json[0]
                    })
                    document.getElementById(`projects-bookmark__${this.state.currentProject.title}`)?.classList.add('projects-bookmark__name--highlight')
                })
        }
    }

    render(){
        const titleComponents = this.state.titles.map(title => <p key={title} className='projects-bookmark__name' id={`projects-bookmark__${title}`}>{title}</p>)

        let tags: String = ''
        
        // Nicely align the tags of the currently selected project
        if (this.state.currentProject.tags !== undefined){
            this.state.currentProject.tags.forEach(tag => {
                tags += `, ${tag}`
            });
        }

        return(
        <div className='projects-container' id='projects'>
            <div className='projects-bookmark' onClick={this.viewProject}>
                {titleComponents}
            </div>
            <div className='projects-project'>
                <h1 className='projects-project__title'>{this.state.currentProject.title}</h1>
                <p className='projects-project__desc'>{this.state.currentProject.long_desc}</p>
                <p className='projects-project__tags'>{tags !== '' && `Tags: ${tags.slice(2)}`}</p>
                <a href={this.state.currentProject.link} className='projects-project__link'>{this.state.currentProject !== {} && this.state.currentProject.link}</a>
            </div>
        </div>)
    }
}

export default Projects
