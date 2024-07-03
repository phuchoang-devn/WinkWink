import './styles/authLayout.scss'
import {useState} from "react";
import logo from "../../static/image/home/logo-small.svg"
import AuthRegister from "./AuthRegister";
import AuthLogin from './AuthLogin';

const AuthMain = (props) => {
    const [showLogin, setShowLogin] = useState(false); //create Acc
    const [isSignUp, setSignUp] = useState(true);//create Acc

    const[showDialog, setShowDialog] = useState(false);
    const[isSign, setSign] = useState()

    const handleClick = () =>{
        console.log("clicked")
        setShowLogin(true)
        setSignUp(true)
    }

    const handleLogClick = () =>{
        console.log("clicked log in")
        setShowDialog(true)
        setSign(true)
    }
    return(
        <>
            <div className="home__info">
                <div className="home__info-heading">
                    <img src={logo} alt=""/>
                    <h1 className="heading">
                        WinkWink
                    </h1>
                </div>

                <div className="auth-btn">
                <button className="create-btn" type="button" onClick={handleClick}>
                    Create Account
                </button>
                {showLogin && (
                    <AuthRegister
                        setShowLogin = {setShowLogin}
                        isSignUp={isSignUp}
                    />)}
                 <button type="button" className="login-btn" onClick={handleLogClick}>
                            Log in
                </button>
                {showDialog && (
                    <AuthLogin
                        setShowDialog = {setShowDialog}
                        isSign={isSign}
                    />)} 
                </div>

                    
            </div>
        </>
    );
}

export default AuthMain;