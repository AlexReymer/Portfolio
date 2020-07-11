import * as React from 'react'
import '../styles/Contact.css'
import '../styles/Slider.css'

class Contact extends React.Component<{}, {}>{
    render(){
        return(
        <div className='contact-flex' id='contact'>
            <div className='contact-container'>
                <h1 className='contact-title'>Contact Me</h1>
                <form className='contact-form'>
                    <label className='contact-form__label'>Name</label>
                    <input type='text' className='contact-form__input'></input>
                    <label className='contact-form__label'>Email Address</label>
                    <input type='text' className='contact-form__input'></input>
                    <label className='contact-form__label'>Subject</label>
                    <input type='text' className='contact-form__input'></input>
                    <label className='contact-form__label'>Message</label>
                    <textarea rows={4} className='contact-form__input' id='contact-form__message'></textarea>
                </form>
                <div className='contact-button-container'>
                    <button type='submit' className='contact-button' data-testid='button-contact'>Send</button>
                </div>
            </div>
        </div>)
    }
}

export default Contact
