import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './Footer.css';

function Footer() {
    const { isAuth, logout } = useAuth();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-sections">
                    <div className="footer-section">
                        <div className="website-name-footer">
                            <NavLink to="/"><span className="brand-main">Workout</span><span className="brand-accent">Flow</span></NavLink>
                        </div>
                        <p>Your personal fitness assistant that helps you achieve your fitness goals.</p>
                    </div>
                    <div className="footer-text">
                        <p>&copy; {new Date().getFullYear()} WorkoutFlow. All rights reserved.</p>
                    </div>
                </div>

                <div className="footer-sections">
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <Link to="/" className="footer-link">Home</Link>
                        <Link to="/features" className="footer-link">Features</Link>
                        <Link to="/highlights" className="footer-link">Highlights</Link>
                        <Link to="/testimonials" className="footer-link">Testimonials</Link>
                        <Link to="/contact" className="footer-link">Contact</Link>
                        <Link to="/faq" className="footer-link">FAQ</Link>
                    </div>
                </div>

                <div className="footer-sections">
                    <div className="footer-section">
                        <h4>Features</h4>
                        {isAuth ? (
                            <>
                                <Link to="/workout-builder" className="footer-link">Workout Builder</Link>
                                <Link to="/search" className="footer-link">Exercise Finder</Link>
                            </>
                        ) : (
                            <>
                                <span className="footer-link disabled">Workout Builder (Login required)</span>
                                <span className="footer-link disabled">Exercise Finder (Login required)</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="footer-sections">
                    <div className="footer-section">
                        <h4>Account</h4>
                        {isAuth ? (
                            <>
                                <Link to="/profile" className="footer-link">My Profile</Link>
                                <span className="footer-link clickable" onClick={logout}>Log Out</span>
                            </>
                        ) : (
                            <>
                                <Link to="/log-in" className="footer-link">Log In</Link>
                                <Link to="/sign-up" className="footer-link">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
