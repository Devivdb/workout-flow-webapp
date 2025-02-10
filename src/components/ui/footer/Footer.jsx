import './Footer.css'
import {NavLink} from "react-router-dom";

function Footer(){
    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-text">
                        <p>DESIGNED BY:</p>
                        <p>Devi van den Broeke</p>
                        <p>© 2024 – 2025 WorkoutFlow</p>
                    </div>
                    <div className="footer-links">
                        <NavLink to="/" className="footer-link">Home</NavLink>
                        <NavLink to="/features" className="footer-link">Features</NavLink>
                        <NavLink to="/testimonials" className="footer-link">Testimonials</NavLink>
                        <NavLink to="/highlights" className="footer-link">Highlights</NavLink>
                        <NavLink to="/workout-builder" className="footer-link">Workout Builder</NavLink>
                        <NavLink to="/search" className="footer-link">Exercise finder</NavLink>
                    </div>
                    <div className="footer-sections">
                        <div className="footer-section">
                            <h4>Contact</h4>
                            <NavLink to="/contact" className="footer-link">Contact form</NavLink>
                        </div>
                        <div className="footer-section">
                            <h4>Questions</h4>
                            <NavLink to="/faq" className="footer-link">FAQ</NavLink>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    );
};

export default Footer;