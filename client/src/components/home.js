import { 
    HomeLayout, 
    HomeMain, 
    HomeProfile, 
    HomeSetting
} from "./home_components";
import NoPage from "./nopage";

import { Route } from "react-router-dom";

const Home = (props) => {
    return (
        <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomeMain />} />
            <Route path="profile" element={<HomeProfile />} />
            <Route path="setting" element={<HomeSetting />} />
            <Route path="*" element={<NoPage />} />
        </Route>
    );
}

export default Home;