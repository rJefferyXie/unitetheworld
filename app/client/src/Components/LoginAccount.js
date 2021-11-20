import '../App.css';
import './LoginAccount.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

const LoginAccount = () => {
    const cancel = () => {
        document.location.pathname = "/account";
    }

    const submit = (e) => {
        e.preventDefault();

    }

    return (
        <div className="Login flex">
            <form className="Create-form flex" onSubmit={submit}>
                <h3>Login</h3>
                <div className="Login-username">
                    <label>Username</label>
                    <div className="Login-item Form-item">
                        <FontAwesomeIcon icon={faUser}/>
                        <input className="Login-input" type="text" placeholder="Username"/>
                    </div>
                </div>

                <div className="Login-password">
                    <label>Password</label>
                    <div className="Login-item Form-item">
                        <FontAwesomeIcon icon={faLock}/>
                        <input className="Login-input" type="text" placeholder="Password"/>
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