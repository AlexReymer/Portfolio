import * as React from 'react'
import '../styles/Header.css'

class Header extends React.Component<{},{}>{
    
    /*
     * Mouse event listener that makes the navbar tabs switch between the pages.
     */
    navbarSwitchPages(e : React.MouseEvent){
        if ((e.target as HTMLElement).id !== 'header-container' || (e.target as HTMLElement).id !== 'header-navbar'){
            if ((e.target as HTMLElement).id === 'header-logo'){
                document.getElementById('main-buttons_0')?.click()
            }else if ((e.target as HTMLElement).id === 'about-link'){
                document.getElementById('main-buttons_1')?.click()
            }
            else if ((e.target as HTMLElement).id === 'projects-link'){
                document.getElementById('main-buttons_2')?.click()
            }
            else if ((e.target as HTMLElement).id === 'contact-link'){
                document.getElementById('main-buttons_3')?.click()
            }
        }
    }
    
    render(){
        return (
        <div onClick={this.navbarSwitchPages} className='header-container'>
            <a href='#home'><img src={require('../images/logo.svg')} alt='' id='header-logo'/></a>
            <div className='header-navbar'>
                <a href='#about' className='header-navbar__link' id='about-link'>About</a>
                <a href='#projects' className='header-navbar__link' id='projects-link'>Projects</a>
                <a href='#contact' style={{borderRight: 'none', color: 'var(--color-2)'}} className='header-navbar__link' id='contact-link'>Contact</a>
            </div>
        </div>)
    }
}

export default Header