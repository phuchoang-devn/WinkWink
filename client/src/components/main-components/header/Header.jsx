import logo from "../../../static/image/home/logoCollor.svg"

import "./header.css";
/* import AuthLogin from "../../auth_components/AuthLogin"; */
/* import {useState} from "react"; */

export const Header = ({setShowLogin,showLogin}) => {
    /* const [isSignUp, setSignUp] = useState(true);
    const handleClick = () =>{
        console.log('gut')
        setShowLogin(true);
        setSignUp(false);
    } */

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
                    {/* <li className="header__nav-list_item">
                        <button type="button" className="login-btn"
                                onClick={handleClick}
                                >
                            Log in
                        </button>
                        {showLogin && (
                            <AuthLogin
                                setShowLogin = {setShowLogin}
                                isSignUp={isSignUp}
                            />)}

                    </li> */}
                </ul>
            </nav>
        </header>
    );
}




