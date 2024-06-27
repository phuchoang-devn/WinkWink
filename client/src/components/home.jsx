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
import { StoreProvider } from "../store";

const Home = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        if (!user) navigate("/profile")
    }, [user])

    return (
        <StoreProvider>
            <Routes>
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<HomeMain />} />
                    <Route path="profile" element={<HomeProfile />} />
                    <Route path="setting" element={<HomeSetting />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </StoreProvider>
    );
}

export default Home;