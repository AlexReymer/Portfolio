import * as React from 'react'
import emailjs from 'emailjs-com';
import '../styles/Contact.css'

class Contact extends React.Component<{}, {validName, validEmail, validSubject, validMessage}>{

    constructor(props){
        super(props)
        this.state = {
            validName: true,
            validEmail: true,
            validSubject: true,
            validMessage: true
        }
    }

    formValidation = () => {
        const name: String = (document.getElementById('contact-form__name') as HTMLInputElement).value
        const email: String = (document.getElementById('contact-form__email') as HTMLInputElement).value
        const subject: String = (document.getElementById('contact-form__subject') as HTMLInputElement).value
        const message: String = (document.getElementById('contact-form__message') as HTMLTextAreaElement).value
        
        const isEmpty = (string) => string === undefined || string.length === 0
        const isValidEmail = (email) => {
            const regex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(email.toLowerCase());
        }

        // Check that the name, subject and message fields are all non-empty and that the email is valid
        const validName: Boolean = !isEmpty(name)
        const validEmail: Boolean =  isValidEmail(email)
        const validSubject: Boolean =  !isEmpty(subject)
        const validMessage: Boolean =  !isEmpty(message)
        
        this.setState({
            validName: validName,
            validEmail: validEmail,
            validSubject: validSubject,
            validMessage: validMessage
        })

        return validName && validEmail && validSubject && validMessage
    }

    sendEmail = (e: any) => {
        if (this.formValidation()){
            const template_params: Object = {
                "from_email": (document.getElementById('contact-form__email') as HTMLInputElement).value,
                "subject": (document.getElementById('contact-form__subject') as HTMLInputElement).value,
                "from_name": (document.getElementById('contact-form__name') as HTMLInputElement).value,
                "message": (document.getElementById('contact-form__message') as HTMLTextAreaElement).value
             }

            emailjs.send('default_service', 'edited_template', template_params, process.env.EMAILJS_ID)
                .then((result) => {
                    console.log(result.text)
                }, (error) => {
                    console.log(error.text)
                })
        }
    }

    render(){
        return(
        <div className='contact-flex' id='contact'>
            <div className='contact-container'>
                <h1 className='contact-title'>Contact Me</h1>
                <form onSubmit={() => false} className='contact-form'>
                    <label className='contact-form__label'>Name</label>
                    <input 
                        style={this.state.validName ? {} : { border: 'solid 1px var(--color-2)'}} 
                        placeholder={this.state.validName ? '' : 'Please enter a name!'}
                        name='from_name'
                        type='text' className='contact-form__input' id='contact-form__name'/>
                    <label className='contact-form__label'>Email Address</label>
                    <input 
                        style={this.state.validEmail ? {} : { border: 'solid 1px var(--color-2)'}} 
                        placeholder={this.state.validEmail ? '' : 'Please enter a valid email!'}
                        name='from_email'
                        type='email' className='contact-form__input' id='contact-form__email'/>
                    <label className='contact-form__label'>Subject</label>
                    <input 
                        style={this.state.validSubject ? {} : { border: 'solid 1px var(--color-2)'}} 
                        placeholder={this.state.validSubject ? '' : 'Please enter a subject!'}
                        name='subject'
                        type='text' className='contact-form__input' id='contact-form__subject'/>
                    <label className='contact-form__label'>Message</label>
                    <textarea 
                        style={this.state.validMessage ? {} : { border: 'solid 1px var(--color-2)'}} 
                        placeholder={this.state.validMessage ? '' : 'Please enter a message!'}
                        name='message'
                        rows={3} className='contact-form__input' id='contact-form__message'/>
                </form>
                <div className='contact-button-container'>
                    <button onClick={this.sendEmail} className='contact-button' data-testid='button-contact' value='Send'/>
                </div>
            </div>
        </div>)
    }
}

export default Contact
