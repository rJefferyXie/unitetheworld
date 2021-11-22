import '../App.css';
import './Contact.css';

import React, { useRef} from 'react'

const Contact = (props) => {

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const messageRef = useRef(null);

    const submit = (event) => {
        event.preventDefault();
        const data = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            message: messageRef.current.value
        }
        alert(JSON.stringify(data))
    }

    const cancel = () => { window.location.pathname = "/summary"; }

    return (
        <div className="Contact flex">
            <form onSubmit={submit} className="Contact-form flex">
                <div className="Name-container">
                    <input className="Form-item" type="text" ref={firstNameRef} placeholder="First Name" tabIndex="1"></input>
                    <input className="Form-item" type="text" ref={lastNameRef} placeholder="Last name" tabIndex="2"></input>
                </div>
                <div className="Email-phone-container">
                    <input className="Form-item" type="email" ref={emailRef} placeholder="Email"tabIndex="3"></input>
                    <input className="Form-item" type="text" ref={phoneRef} placeholder="Phone (Optional)"tabIndex="4"></input>
                </div>
                <textarea className="Form-item Form-message" type="text" ref={messageRef} placeholder="Type your message here" tabIndex="5"></textarea>
                <div className="Button-container flex">
                    <button className="Form-item Form-button" type="button"onClick={cancel}>Cancel</button>
                    <button className="Form-item Form-button" type="submit">Send Message</button>
                </div>
            </form>
        </div>
    );
}

export default Contact;