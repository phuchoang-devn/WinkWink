import {
    AuthLayout,
    AuthMain,
    AuthLogin,
    AuthRegister
} from "./auth_components";
import NoPage from "./nopage";

import { Route, Routes } from "react-router-dom";

const Auth = (props) => {
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route index element={<AuthMain />} />
                <Route path="login" element={<AuthLogin />} />
                <Route path="register" element={<AuthRegister />} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>

    );
}

export default Auth;