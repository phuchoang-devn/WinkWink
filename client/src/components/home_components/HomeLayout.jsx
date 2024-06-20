import { Outlet } from "react-router-dom";
import { HomeHeader } from "./HomeHeader";
import './main_components/styles/swiper.scss'


const HomeLayout = (props) => {
    return(
        <div className="main-home-container">
            <HomeHeader />
            <Outlet />
        </div>
    );
}

export default HomeLayout;