import * as React from 'react'
import '../styles/App.css'

class Home extends React.Component<{headerText},{}>{
    render(){
        return(
        <div id='home'>
            <div className='app-banner-container'>
                <p className='app-banner__text'>{this.props.headerText}</p>
                <div className='app-banner-flex'> 
                    <div className='app-banner'>
                        <h1 className='app-banner__name'>Alex Reymer</h1>
                        <h2 className='app-banner__subtitle'>Software Developer</h2>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Home