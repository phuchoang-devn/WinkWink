import logoBig from "../../../image/home/logo-color.svg"

import "./header.css";
import AuthLogin from "../../auth_components/AuthLogin";
import {useState} from "react";

export const Header = ({setShowLogin,showLogin}) => {
    const [isSignUp, setSignUp] = useState(true);
    const handleClick = () =>{
        console.log('gut')
        setShowLogin(true);
        setSignUp(false);
    }

    return (
        <header>
            <nav className="header__nav">
                <ul className="header__nav-list">
                    <li className="header__nav-list_item">
                        <img src={logoBig} alt="GMLink logo" />
                    </li>
                </ul>
                <ul className="header__nav-list">
                    <li className="header__nav-list_item">
                        Contact us
                    </li>
                    <li className="header__nav-list_item">
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

                    </li>
                </ul>
            </nav>
        </header>
    );
}




