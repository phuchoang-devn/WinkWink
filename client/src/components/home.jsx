import {
    HomeLayout,
    HomeMain,
    HomeProfile,
    HomeSetting
} from "./home_components";
import NoPage from "./nopage";

import { Route, Routes } from "react-router-dom";

const Home = (props) => {
    console.log("home")
    return (
        <Routes>
            <Route path="/" element={<HomeLayout />}>
                <Route index element={<HomeMain />} />
                <Route path="profile" element={<HomeProfile />} />
                <Route path="setting" element={<HomeSetting />} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
    );
}

export default Home;