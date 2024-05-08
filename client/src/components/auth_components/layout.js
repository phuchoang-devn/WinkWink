import { Outlet } from "react-router-dom";

const AuthLayout = (props) => {
    console.log("home layout")
    return(
        <div>
            <Outlet />
        </div>
    );
}

export default AuthLayout;