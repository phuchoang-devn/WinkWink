import { Outlet } from "react-router-dom";

const HomeLayout = (props) => {
    return(
        <div>
            <Outlet />
        </div>
    );
}

export default HomeLayout;