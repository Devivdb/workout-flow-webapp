import './Header.css';
import { NavLink } from "react-router-dom";

function Header() {

    return (
        <header className="nav-bar">
            <nav className="menu">
                <p className="website-name">
                    <NavLink to="/">Workout<span>Flow</span></NavLink>
                </p>
                <ul className="main-menu">
                    <li>
                        <NavLink to="/features">Features</NavLink>
                    </li>
                    <li>
                        <NavLink to="/highlights">Highlights</NavLink>
                    </li>
                    <li>
                        <NavLink to="/testimonials">Testimonials</NavLink>
                    </li>
                    <li>
                        <NavLink to="/workout-builder">Workout builder</NavLink>
                    </li>
                    <li>
                        <NavLink to="/search">Exercise finder</NavLink>
                    </li>
                </ul>
                <ul className="sign-in-log-in">
                            <li>
                                <NavLink to="/log-in">Log in</NavLink>
                            </li>
                            <li>
                                <NavLink to="/sign-up">Sign up</NavLink>
                            </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
