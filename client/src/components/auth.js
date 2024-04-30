import {
    AuthLayout,
    AuthMain, 
    AuthLogin,
    AuthRegister
} from "./auth_components";
import NoPage from "./nopage";

import { Route } from "react-router-dom";

const Auth = (props) => {
    return (
        <Route path="/" element={<AuthLayout />}>
            <Route index element={<AuthMain />} />
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
            <Route path="*" element={<NoPage />} />
        </Route>
    );
}

export default Auth;