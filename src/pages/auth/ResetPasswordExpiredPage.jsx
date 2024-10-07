// React library import
import { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress, Stack } from "@mui/material";
import { ArrowBackOutlined } from "@mui/icons-material";
import theme from "../../assets/themes"; // Assuming you have a custom MUI theme
import RatifyMELogo from "../../assets/icons/RatfiyME.svg"; // Assuming you have this logo
import OutletImageComponent from "./OutletImageTemplate";
import AlertMessage from "../../components/alert/AlertMessage"; // Assuming this is a custom alert component

const ResetPasswordExpiredPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating a network request delay with setTimeout
        const timer = setTimeout(() => {
            setLoading(false); // After 3 seconds, set loading to false
        }, 3000); // 3 seconds delay

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, []);

    return <>ResetPasswordExpiredPage</>;
};

export default ResetPasswordExpiredPage;
