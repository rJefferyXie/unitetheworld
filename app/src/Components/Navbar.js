import '../App.css';
import './Navbar.css';

const Navbar = (props) => {
    const switchPage = (clickedLink) => {
        console.log(document.getElementsByClassName(clickedLink));
        document.getElementByClassName('active').className.replace('active', '');
        document.getElementByClassName(clickedLink).className += ' active';
    }

    return (
        <nav className="App-navbar">
            <div className="App-navbar-container flex">
                <a href="/" className="App-logo"><i className="fab fa-sith"></i>UniteTheWorld</a>
                <ul className="App-navbar-menu flex">
                    <li className="App-navbar-item flex">
                        <a href="/about" onClick={() => switchPage('about')} className="App-navbar-link about">About</a>
                    </li>
                    <li className="App-navbar-item flex">
                        <a href="/donate" onClick={() => switchPage('donate')}  className="App-navbar-link donate">Donate</a>
                    </li>
                    <li className="App-navbar-item flex">
                        <a href="/contact" onClick={() => switchPage('contact')}  className="App-navbar-link contact">Contact</a>
                    </li>
                    <li className="App-navbar-item flex">
                        <a href="/account" onClick={() => switchPage('account')}  className="App-navbar-link account">Account</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;