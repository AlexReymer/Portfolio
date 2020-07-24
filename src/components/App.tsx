import * as React from 'react'
import '../styles/App.css'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import About from './About'
import Projects from './Projects'
import Contact from './Contact'

class App extends React.Component<{}, { currentSlide, skills }>{
  constructor(props: any){
    super(props)

    const skills: String[] = [
        'Javascript',
        'Typescript',
        'React',
        'HTML',
        'CSS',
        'Java',
        'C#',
        'Python',
        'MySQL',
        'MongoDB',
        'Git'
    ]

    this.state={ 
        currentSlide: 'main-buttons_0',
        skills: skills
    }
  }

  componentDidMount(){
      const vh: Number = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)

      document.addEventListener('keydown', this.scrollButtonKeypress)
      window.onresize = this.screenResize  
  }

  componentWillUnmount(){
      document.removeEventListener('keydown', this.scrollButtonKeypress)
  }

  /*
   * Repositions the currently viewed component when the screen is resized.
   */
  screenResize = () => {
      const vh: Number = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      
      document.getElementById(this.state.currentSlide)?.click()
  }

  /*
   * Key event listener that adds arrow key functionality for navigating the website pages.
   */
  scrollButtonKeypress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight'){
          if ((Number)(this.state.currentSlide[13]) < 3){
              const newSlide: string = `main-buttons_${(Number)(this.state.currentSlide[13])+1}`
              document.getElementById(newSlide)?.click()
          }
      }else if (e.key === 'ArrowLeft'){
          if ((Number)(this.state.currentSlide[13]) > 0){
              const newSlide: string = `main-buttons_${(Number)(this.state.currentSlide[13])-1}`
              document.getElementById(newSlide)?.click()
          }
      }
  }

  /*
   * Event Listener that makes the app-buttons move between pages.
   */
  scrollButtonClick = (e: any) => {
      if (e.target.classList[0] === 'button--circular'){
          document.getElementById(this.state.currentSlide)?.classList.remove('button--circular--selected')
          this.setState({ currentSlide: e.target.id })
          document.getElementById(e.target.id)?.classList.add('button--circular--selected')
          if ((Number)(e.target.id[13]) === 1){
              document.getElementById('about-link')?.classList.add('header-navbar__link--highlight') 
              document.getElementById('projects-link')?.classList.remove('header-navbar__link--highlight')        
              document.getElementById('contact-link')?.classList.remove('header-navbar__link--highlight')        
          }
          else if ((Number)(e.target.id[13]) === 2){
              document.getElementById('projects-link')?.classList.add('header-navbar__link--highlight') 
              document.getElementById('about-link')?.classList.remove('header-navbar__link--highlight')        
              document.getElementById('contact-link')?.classList.remove('header-navbar__link--highlight')        
          }
          else if ((Number)(e.target.id[13]) === 3){
              document.getElementById('contact-link')?.classList.add('header-navbar__link--highlight') 
              document.getElementById('projects-link')?.classList.remove('header-navbar__link--highlight')        
              document.getElementById('about-link')?.classList.remove('header-navbar__link--highlight')        
          }else if ((Number)(e.target.id[13]) === 0){
              document.getElementById('contact-link')?.classList.remove('header-navbar__link--highlight') 
              document.getElementById('projects-link')?.classList.remove('header-navbar__link--highlight')        
              document.getElementById('about-link')?.classList.remove('header-navbar__link--highlight')
          }
      }
  }
  
  render(){
    /*let headerText: String = ''
    for (let i = 0; i < 60; i++){
        headerText += `\xa0 ${skills[Math.floor(Math.random() * skills.length)]}`  
    }*/
    return (
      <div  className='app-container'>
        <Header/>
        <div className='app'>
            <Home/>
            <About skills={this.state.skills}/>
            <Projects/>
            <Contact/>
            <div onClick={this.scrollButtonClick} className='app-buttons'>
                <a href='#home' className='button--circular button--circular--selected' id='main-buttons_0'> </a>
                <a href='#about' className='button--circular' id='main-buttons_1'> </a>
                <a href='#projects' className='button--circular' id='main-buttons_2'> </a>
                <a href='#contact' className='button--circular' id='main-buttons_3'> </a>
            </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default App;
