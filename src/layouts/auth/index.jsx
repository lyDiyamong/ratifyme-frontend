// MUI Import
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <Box width="100%" height="100%">
            <Outlet />
        </Box>
    );
};

export default AuthLayout;
