import logo from "../../static/image/home/logoCollor.svg"
import "../main-components/header/header.scss";
import '../../index.scss'
import { useAuth } from "../../static/js/context_providers/auth_provider";
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { useState } from "react"; 

export const HomeHeader = () => {
    const { logout } = useAuth();
    const location = useLocation();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const getNavText = () => {
        switch (location.pathname) {
            case '/profile':
                return 'Settings';
            case '/':
            default:
                return 'My Profile';
        }
    };
    const handleSettingsClick = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };
    return (
        <header className="home-header">
            <nav className="header__nav">
                <ul className="header__nav-list">
                    <li className="header__nav-list_item">
                        <img src={logo} alt="Wink-Wink logo" />
                    </li>
                </ul>
                <ul className="header__nav-list">
                <li className="header__nav-list_item-text" onClick={handleSettingsClick}>{getNavText()}
                    {getNavText() === 'Settings' && (
                            <div className={`dropdown-menu ${isDropdownVisible ? 'visible' : ''}`}>
                                <button>Change Password</button>
                                <button className="btn-delete">Delete Account</button>
                            </div>
                        )}</li>
                    <li>
                        <button className="btn-logout" onClick={logout}>Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

