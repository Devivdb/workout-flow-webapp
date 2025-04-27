import './PublicHeader.css';
import '../Header.css'
import { NavLink } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth.js";

function PublicHeader() {
    const { isAuth, user, logout } = useAuth();

    return (
        <header className="horizontal-nav-bar">
            <nav className="menu horizontal-menu">
                <p className="website-name horizontal-website-name">
                    <NavLink to="/">Workout<span>Flow</span></NavLink>
                </p>
                <ul className="main-menu horizontal-main-menu">
                    {isAuth ? (
                        // Show only protected routes for logged-in users
                        <>
                            <li>
                                <NavLink to="/workout-builder">Workout builder</NavLink>
                            </li>
                            <li>
                                <NavLink to="/search">Exercise finder</NavLink>
                            </li>
                        </>
                    ) : (
                        // Show public navigation for non-logged-in users
                        <>
                            <li>
                                <NavLink to="/features">Features</NavLink>
                            </li>
                            <li>
                                <NavLink to="/highlights">Highlights</NavLink>
                            </li>
                            <li>
                                <NavLink to="/testimonials">Testimonials</NavLink>
                            </li>
                        </>
                    )}
                </ul>
                <ul className="horizontal-sign-in-log-in">
                    {isAuth ? (
                        <>
                            <li className="user-welcome">
                                Welcome, {user?.username || 'User'}
                            </li>
                            <li>
                                <button className="logout-button" onClick={logout}>Log out</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/log-in">Log in</NavLink>
                            </li>
                            <li>
                                <NavLink to="/sign-up">Sign up</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default PublicHeader;