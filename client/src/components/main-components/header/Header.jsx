import logo from "../../../static/image/home/logoCollor.svg"

import "./header.scss";

export const Header = () => {
    return (
        <header>
            <nav className="header__nav">
                <ul className="header__nav-list">
                    <li className="header__nav-list_item">
                        <img src={logo} alt="Wink-Wink logo" />
                    </li>
                </ul>
                <ul className="header__nav-list">
                    <li className="header__nav-list_item-text">
                        Contact us
                    </li>
                </ul>
            </nav>
        </header>
    );
}




