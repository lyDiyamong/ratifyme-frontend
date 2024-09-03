import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const LandingLayout = () => {

    return (
        <Box width="100%" height="100%">
            <Navbar />
            <Outlet />
            <Footer />
        </Box>
    );
};

export default LandingLayout;
