import { useEffect } from "react";
import { useUser } from "../static/js/context_providers/auth_provider";
import { WSProvider } from "../store/webSocket";
import {
    HomeLayout,
    HomeMain,
    HomeProfile,
    HomeSetting
} from "./home_components";
import NoPage from "./nopage";

import { Route, Routes, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    
    useEffect(() => {
        if(!user) navigate("/profile") 
    }, [user])

    return (
        <Routes>
            <Route path="/" element={<HomeLayout />}>
                <Route index
                    element={
                        <WSProvider>
                            <HomeMain />
                        </WSProvider>
                    } />
                <Route path="profile" element={<HomeProfile />} />
                <Route path="setting" element={<HomeSetting />} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
    );
}

export default Home;