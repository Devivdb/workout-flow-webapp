import './Contact.css'
import useBackground from "../../../../workout-flow-webapp/src/hooks/useBackground.js";

function Contact(){

    useBackground("contact-background")

    return (
        <>
            <div className="contact-container">
                <form className="contact-form">
                    <h2>Contact Us</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName"></label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="First name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName"></label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Last name"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email"></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email address"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message"></label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            placeholder="Message"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="contact-button">Send Message</button>
                </form>
            </div>
        </>
    );
};

export default Contact;