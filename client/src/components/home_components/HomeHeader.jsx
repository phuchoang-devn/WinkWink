import logo from "../../static/image/home/logoCollor.svg"
import "../main-components/header/header.scss";
import '../../index.scss'
import { useAuth, useUser } from "../../context_providers/auth_provider";
import { useNavigate } from 'react-router-dom';

export const HomeHeader = () => {
    const { logout } = useAuth();
    const { user } = useUser();

    const navigate = useNavigate();
    const navigateProfile = () => navigate("/profile")
    const navigateSetting = () => navigate("/setting")
    const navigateMain = () => {
        if (user)
            navigate("/")
    }

    return (
        <header className="home-header">
            <nav className="header__nav">
                <ul className="header__nav-list">
                    <li className="header__nav-list_item"
                        onClick={navigateMain}
                    >
                        <img src={logo} alt="Wink-Wink logo" />
                    </li>
                </ul>
                <ul className="header__nav-list">
                    <li className="header__nav-list_item-text" onClick={navigateProfile}>My Profile</li>
                    <li className="header__nav-list_item-text" onClick={navigateSetting}>Setting</li>
                    <li>
                        <button className="btn-logout" onClick={logout}>Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

