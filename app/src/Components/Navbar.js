import '../App.css';
import './Navbar.css';

const Navbar = (props) => {
    return (
        <nav className="App-navbar">
            <div className="App-navbar-container flex">
                <a className="App-logo"><i class="fab fa-sith"></i>UniteTheWorld</a>
                <ul className="App-navbar-menu flex">
                    <li className="App-navbar-item flex">
                        <a className="App-navbar-link">About</a>
                    </li>
                    <li className="App-navbar-item flex">
                        <a className="App-navbar-link">Donate</a>
                    </li>
                    <li className="App-navbar-item flex">
                        <a className="App-navbar-link">Contact</a>
                    </li>
                    <li className="App-navbar-item flex">
                        <a className="App-navbar-link">Account</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;