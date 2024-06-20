import {Header} from "../main-components/header/Header";
import {Footer} from "../main-components/footer/Footer";
import './styles/authLayout.scss';
import home from "../../static/image/home/home2.svg"
import {useState} from "react";
import { Outlet } from "react-router-dom";
const AuthLayout = (props) => {
    const [showLogin, setShowLogin] = useState(false);
    return(
        <div className="auth-layout">
            <Header
                setShowLogin = {setShowLogin}
                showLogin={showLogin}
            />
            <main className="home">
                <div className="home-container">
                    <div className="home__image">
                        <img src={home} alt=""/>
                    </div>
                    <Outlet />
                </div>
            </main>
            <Footer/>

        </div>
            
    );
}
export  default  AuthLayout;

