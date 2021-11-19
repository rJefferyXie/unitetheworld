import '../App.css';
import './Account.css';

const Account = (props) => {
    return (
        <div className="Account flex">
            <a className="Account-button create-account" href="/create">Create Account</a>
            <a className="Account-button login-account" href="/login">Sign In</a>
        </div>
    );
}

export default Account;