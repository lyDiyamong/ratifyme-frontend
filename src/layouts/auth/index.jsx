import { Box } from "@mui/material";
import Navbar from "../landing/Navbar";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {

    return (
        <Box width="100%" height="100%">
            <Navbar />
            <Outlet />
        </Box>
    );
};

export default AuthLayout;
