import {Header} from "../main-components/header/Header";
import {Footer} from "../main-components/footer/Footer";
import './styles/authLayout.css';
import homeImg from "../../static/image/home/Group.svg";
import AuthMain from "./AuthMain";
import {useState} from "react";
import { Outlet } from "react-router-dom";
const AuthLayout = (props) => {
    const [showLogin, setShowLogin] = useState(false);
    return(
        <>
            <Header
                setShowLogin = {setShowLogin}
                showLogin={showLogin}

            />
            <main className="home">
                <div className="home-container">
                    <div className="home__image">
                        <img src={homeImg} alt=""/>
                    </div>
                    <AuthMain />
                </div>
            </main>
            <Footer/>
           
        </>
);
}
export  default  AuthLayout;

