import { Outlet } from "react-router-dom";
import { useAuth } from "../../static/js/context_providers/auth_provider";

const HomeLayout = (props) => {
    const { logout } = useAuth();
    return(
        <div>
            <div onClick={logout}
                style={{
                    position: "absolute",
                    right: 0
                }}
            >
                Logout
            </div>

            <Outlet />
        </div>
    );
}

export default HomeLayout;