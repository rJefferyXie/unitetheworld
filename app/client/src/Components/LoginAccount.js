import '../App.css';
import './LoginAccount.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

import React, { useRef} from 'react'


const LoginAccount = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const cancel = () => {
        window.location.pathname = "/account";
    }

    const submit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="Login flex">
            <form className="Login-form flex" onSubmit={submit}>
                <h3>Login</h3>
                <div className="Login-username">
                    <label>Username</label>
                    <div className="Login-item">
                        <input className="Login-input" type="text" placeholder="Username"/>
                        <FontAwesomeIcon className="Login-icon" icon={faUser}/>
                    </div>
                </div>

                <div className="Login-password">
                    <label>Password</label>
                    <div className="Login-item">
                        <input className="Login-input" type="text" placeholder="Password"/>
                        <FontAwesomeIcon className="Login-icon" icon={faLock}/>
                    </div>
                </div>

                <div className="Button-container flex">
                    <button className="Form-item Form-button" type="reset"onClick={cancel}>Cancel</button>
                    <button className="Form-item Form-button" type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginAccount;