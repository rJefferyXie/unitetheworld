import '../App.css';
import './Hero.css';

const Hero = (props) => {
    return (
        <div className="Hero">
            <div className="Hero-intro">
                <div className="Hero-text-container flex">
                    <div className="Hero-text">Everybody should have food on their tables. Help unite the world.</div>
                    <div className="Hero-button-container flex">
                        <a href="/about" className="Hero-button learn-more">Learn More</a>
                        <a href="/account" className="Hero-button get-start">Get Started</a>
                    </div>
                </div>
            </div>
            <div className="Hero-donate"></div>
            {/* <div className="Hero-contact-container"></div> */}
        </div>
    );
};

export default Hero;