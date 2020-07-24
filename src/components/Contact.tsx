import * as React from 'react'
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

    /*
     * Checks that all contact-form fields and non-empty and valid.
     */
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

    /*
     * Makes a POST request to send an email after validating the form.
     */
    sendEmail = (e: any) => {
        if (this.formValidation()){
            const data: Object = {
                from_email: (document.getElementById('contact-form__email') as HTMLInputElement).value,
                subject: (document.getElementById('contact-form__subject') as HTMLInputElement).value,
                from_name: (document.getElementById('contact-form__name') as HTMLInputElement).value,
                message: (document.getElementById('contact-form__message') as HTMLTextAreaElement).value
             }
            fetch('/sendEmail', {
                method: 'POST',
                body: JSON.stringify(data),
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log("Success: Email Sent!")
            }).catch((error) => {
                console.error(`Error: ${error}`)
            })
        }else{
            e.preventDefault()
        }
    }

    render(){
        return(
        <div className='contact-flex' id='contact'>
            <div className='contact-container'>
                <h1 className='contact-title'>Contact Me</h1>
                <form onSubmit={this.sendEmail} className='contact-form'>
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
                    <div className='contact-button-container'>
                        <input type='submit' className='contact-button' data-testid='button-contact' value='Send'/>
                    </div>
                </form>
            </div>
        </div>)
    }
}

export default Contact
