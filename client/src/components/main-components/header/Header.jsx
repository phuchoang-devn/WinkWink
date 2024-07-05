import { useNavigate } from "react-router-dom";
import logo from "../../../static/image/home/logo.svg"

import "./header.scss";

export const Header = () => {
    const navigate = useNavigate();

    const navigateMain = () => navigate("/")

    return (
        <header>
            <nav className="header__nav">
                <ul className="header__nav-list">
                    <li className="header__nav-list_item"
                        onClick={navigateMain}
                    >
                        <img src={logo} alt="Wink-Wink logo" />
                    </li>
                </ul>
                <ul className="header__nav-list">
                    <li className="header__nav-list_item-text">
                        <a href="mailto:winkWink@gmail.com">Contact us</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}




