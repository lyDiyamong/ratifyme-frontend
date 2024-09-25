import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Mui import
import { Box, Alert } from "@mui/material";

/**
 *
 * @param {String} variant - variant of alert message (["success", "info", "warning", "error"])
 * @param {JSX.Element} children - content of the alert
 * @return {JSX.Element} rendered AlertMessage component
 */
function AlertMessage({ variant, children }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Set a timer to hide the alert after 2 seconds
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return createPortal(
        <Box
            sx={{
                position: "absolute",

                top: 20,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000,
            }}
        >
            <Alert severity={variant} sx={{ px: 2 }}>
                {children}
            </Alert>
        </Box>,
        document.body,
    );
}

export default AlertMessage;
