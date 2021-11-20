import '../App.css';
import './LoginAccount.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const LoginAccount = (props) => {
    return (
        <div className="Login flex">
            <FontAwesomeIcon icon={faCoffee}/>

        </div>
    );
}

export default LoginAccount;