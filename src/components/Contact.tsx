import * as React from "react";
import "../styles/Contact.css";

class Contact extends React.Component<
  {},
  { contactInfo; validName; validEmail; validSubject; validMessage }
> {
  constructor(props) {
    super(props);

    const contactName: React.RefObject<any> = React.createRef();
    const contactEmail: React.RefObject<any> = React.createRef();
    const contactSubject: React.RefObject<any> = React.createRef();
    const contactMessage: React.RefObject<any> = React.createRef();

    this.state = {
      contactInfo: {
        name: contactName,
        email: contactEmail,
        subject: contactSubject,
        message: contactMessage,
      },
      validName: true,
      validEmail: true,
      validSubject: true,
      validMessage: true,
    };
  }

  /*
   * Checks that all contact-form fields and non-empty and valid.
   */
  formValidation = () => {
    const name: String = this.state.contactInfo["name"].current.value;
    const email: String = this.state.contactInfo["email"].current.value;
    const subject: String = this.state.contactInfo["subject"].current.value;
    const message: String = this.state.contactInfo["message"].current.value;

    const isEmpty = (string) => string === undefined || string.length === 0;
    const isValidEmail = (email) => {
      const regex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email.toLowerCase());
    };

    // Check that the name, subject and message fields are all non-empty and that the email is valid
    const validName: Boolean = !isEmpty(name);
    const validEmail: Boolean = isValidEmail(email);
    const validSubject: Boolean = !isEmpty(subject);
    const validMessage: Boolean = !isEmpty(message);

    this.setState({
      validName: validName,
      validEmail: validEmail,
      validSubject: validSubject,
      validMessage: validMessage,
    });

    return validName && validEmail && validSubject && validMessage;
  };

  /*
   * Makes a POST request to send an email after validating the form.
   */
  sendEmail = (e: any) => {
    if (this.formValidation()) {
      const data: Object = {
        from_email: this.state.contactInfo["email"].current.value,
        subject: this.state.contactInfo["subject"].current.value,
        from_name: this.state.contactInfo["name"].current.value,
        message: this.state.contactInfo["message"].current.value,
      };
      fetch("/sendEmail", {
        method: "POST",
        body: JSON.stringify(data),
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("Success: Email Sent!");
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        });
    } else {
      e.preventDefault();
    }
  };

  render() {
    return (
      <div className="contact-flex" id="contact">
        <div className="contact-container">
          <h1 className="contact-title">Contact Me</h1>
          <form onSubmit={this.sendEmail} className="contact-form">
            <label className="contact-form__label">Name</label>
            <input
              style={
                this.state.validName
                  ? {}
                  : { border: "solid 1px var(--color-2)" }
              }
              placeholder={this.state.validName ? "" : "Please enter a name!"}
              name="from_name"
              type="text"
              className="contact-form__input"
              id="contact-form__name"
              ref={this.state.contactInfo["name"]}
            />
            <label className="contact-form__label">Email Address</label>
            <input
              style={
                this.state.validEmail
                  ? {}
                  : { border: "solid 1px var(--color-2)" }
              }
              placeholder={
                this.state.validEmail ? "" : "Please enter a valid email!"
              }
              name="from_email"
              type="email"
              className="contact-form__input"
              id="contact-form__email"
              ref={this.state.contactInfo["email"]}
            />
            <label className="contact-form__label">Subject</label>
            <input
              style={
                this.state.validSubject
                  ? {}
                  : { border: "solid 1px var(--color-2)" }
              }
              placeholder={
                this.state.validSubject ? "" : "Please enter a subject!"
              }
              name="subject"
              type="text"
              className="contact-form__input"
              id="contact-form__subject"
              ref={this.state.contactInfo["subject"]}
            />
            <label className="contact-form__label">Message</label>
            <textarea
              style={
                this.state.validMessage
                  ? {}
                  : { border: "solid 1px var(--color-2)" }
              }
              placeholder={
                this.state.validMessage ? "" : "Please enter a message!"
              }
              name="message"
              rows={3}
              className="contact-form__input"
              id="contact-form__message"
              ref={this.state.contactInfo["message"]}
            />
            <div className="contact-button-container">
              <input
                type="submit"
                className="contact-button"
                data-testid="button-contact"
                value="Send"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
