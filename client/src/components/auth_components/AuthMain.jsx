import './styles/authLayout.css'
import {useState} from "react";
import logoSmall from "../../static/image/home/logo-color.svg"
import './styles/authLayout.css'
import AuthRegister from "./AuthRegister";
const AuthMain = (props) => {
    const [showLogin, setShowLogin] = useState(false);

    const [isSignUp, setSignUp] = useState(true);

    const handleClick = () =>{
        console.log("clicked")
        setShowLogin(true)
        setSignUp(true)
    }
    return(
        <>
            <div className="home__info">
                <div className="home__info-heading">
                    <img src={logoSmall} alt=""/>
                    <h1 className="heading">
                        WINK-WINK
                    </h1>
                </div>

                <button className="create-btn" type="button" onClick={handleClick}>
                    Create Account
                </button>
                {showLogin && (
                    <AuthRegister
                        setShowLogin = {setShowLogin}
                        isSignUp={isSignUp}
                    />)}
            </div>
        </>
    );
}

export default AuthMain;