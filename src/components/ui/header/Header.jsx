import './Header.css';
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

function Header() {
    const { isAuth, user, logout } = useAuth();

    return (
        <header className="nav-bar">
            <nav className="menu">
                <p className="website-name">
                    <NavLink to="/">Workout<span>Flow</span></NavLink>
                </p>
                <ul className="main-menu">
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
                <ul className="sign-in-log-in">
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

export default Header;