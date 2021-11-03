import '../App.css';
import './Hero.css';

const Hero = (props) => {
    return (
        <div className="Hero">
            <div className="Hero-intro">
                <div className="Hero-text-container flex">
                    <div className="Hero-text">Everybody should have food on their tables. Help unite the world.</div>
                    <button className="Hero-button">Learn More</button>
                </div>
            </div>
            <div className="Hero-donate"></div>
            {/* <div className="Hero-contact-container"></div> */}
        </div>
    );
};

export default Hero;