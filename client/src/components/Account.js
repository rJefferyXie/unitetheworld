import '../App.css';
import './Account.css';

import Login from './auth/Login';

const Account = () => {
    return (
        <div className="Account flex">
            <div className="Account-container flex">
                <Login></Login>
            </div>
        </div>
    );
}

export default Account;