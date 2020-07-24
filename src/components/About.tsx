import * as React from 'react'
import '../styles/About.css'

class About extends React.Component<{ skills }, { relatedProjects }>{

    constructor(props){
        super(props)
        this.state = { relatedProjects: [] }
    }

    /*
     * Fetches projects with matching tag when a list item from about-skills is clicked.
     */
    getRelatedProjects = (e: any) => {
        if (e.target.classList[0] !== 'about-skills'){
            const tag: String = e.target.innerText
            
            fetch(`/getProjectsByTag/${tag}`, {
                method: 'GET',
                headers: new Headers()
            }).then(res => res.json()).then(json => {
                const relatedProjects: String[] = json.map(obj => obj.title)
                this.setState({ relatedProjects: relatedProjects})
            }).catch((error) => {
                console.log(error)
            })
        }else{
            this.setState({relatedProjects: []})
        }
    }
    
    render(){
        // Map the list of skill strings to li components
        const skillComponents: HTMLElement[] = this.props.skills.map(s => 
            <div key={s} className='about-skills__skill-container'>
                <li className='about-skills__skill'>{s}</li>
            </div>)

        return(
            <div className='about-container' id='about'>
                <div className='about'>
                    <h2 className='about-title'>About Me</h2>
                    <div className='about-text'>
                        <p className='about-text__block'>Hi, I'm Alex!</p>
                        <p className='about-text__block'>Currently I am enrolled at the University of Toronto, 
                        St. George campus, aiming to graduate in November 2020. I enjoy working with 
                        various object oriented languages such as Python, Java and C#, as well as  Javascript
                        and its various frameworks. I love learning new things and further expanding my
                        reportoire of skills, currently exploring the ins and outs of Typescript. 
                        In my leisure time I like to watch shows, play games and create designs.</p>
                    </div>
                    <h3 className='about-subtitle'>Languages and Skills</h3>
                    <ul className='about-skills' onMouseOver={this.getRelatedProjects}>
                        {skillComponents}
                    </ul>
                    <p className='about-related'>Related Projects: {this.state.relatedProjects}</p>
                </div>
        </div>)
    }
}

export default About
