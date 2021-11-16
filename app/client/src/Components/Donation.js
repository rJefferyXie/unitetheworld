import '../App.css';
import './Donation.css';
 
const Donation = (props) => {
    return (
        <div className="Donation">
            <form className="Donate-form" action="/addDonation" method="post">
                <label htmlFor="name">Donation From:</label>
                <input name="name" type="text" placeholder="Your Name..."/>
            </form>
        </div>
        )
}

export default Donation;