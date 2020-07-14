import * as React from 'react'
import '../styles/App.css'

class Home extends React.Component<{},{}>{
    render(){
        return(
        <div id='home'>
            <div className='app-banner-container'>
                <p className='app-banner__text'>Python  React  Typescript  CSS  Git  Git  Javascript  Javascript  Python  Typescript  CSS  MySQL  Javascript  C#  Python  C#  MySQL  C#  HTML  Python  MongoDB  React  C#  Typescript  MySQL  Java  Git  C#  Javascript  Java  C#  Javascript  React  C#  Java  Git  Python  MySQL  Java  React  Python  React  CSS  Typescript  Typescript  CSS  CSS  Python  HTML  CSS  Git  Git  C#  Java  C#  CSS  MongoDB  Python  Python  Git</p>
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