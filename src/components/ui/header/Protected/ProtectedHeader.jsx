import { useState } from 'react';
import { NavLink } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth.js";
import './ProtectedHeader.css';

function ProtectedHeader() {
    const { user, logout } = useAuth();
    const [expanded, setExpanded] = useState(false);

    const protectedNavItems = [
        { to: "/workout-builder", label: "Workout Builder", icon: "🏋️" },
        { to: "/search", label: "Exercise Finder", icon: "🔍" },
        { to: "/profile", label: "My Profile", icon: "👤" }
    ];

    const toggleSidebar = () => {
        setExpanded(!expanded);
    };

    return (
        <header className={`vertical-nav-bar ${expanded ? 'expanded' : ''}`}>
            <nav className="menu vertical-menu">
                <div className="header-top">
                    <p className="website-name vertical-website-name">
                        <NavLink to="/">
                            {expanded ? (
                                <>Workout<span>Flow</span></>
                            ) : (
                                <>W<span>F</span></>
                            )}
                        </NavLink>
                    </p>
                    <button
                        className="toggle-button"
                        onClick={toggleSidebar}
                        aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        {expanded ? '←' : '→'}
                    </button>
                </div>

                <ul className="main-menu vertical-main-menu">
                    {protectedNavItems.map((item) => (
                        <li key={item.to}>
                            <NavLink to={item.to} title={!expanded ? item.label : ''}>
                                <span className="nav-icon">{item.icon}</span>
                                {expanded && <span className="nav-label">{item.label}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <ul className="vertical-sign-in-log-in">
                    {expanded && (
                        <li className="user-welcome">
                            Welcome, {user?.username || 'User'}
                        </li>
                    )}
                    <li>
                        <button
                            className="logout-button"
                            onClick={logout}
                            title={!expanded ? "Log out" : ""}
                        >
                            {!expanded ? '🚪' : 'Log out'}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default ProtectedHeader;