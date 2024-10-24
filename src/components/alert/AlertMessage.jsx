// React library import
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// MUI import
import { Box, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/**
 *
 * @param {String} variant - variant of alert message (["success", "info", "warning", "error"])
 * @param {JSX.Element} children - content of the alert
 * @param {Function} onClose - callback to handle manual closure
 * @return {JSX.Element} rendered AlertMessage component
 */

// =========== Start AlertMessage ===========
const AlertMessage = ({ variant, children, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Set a timer to hide the alert after 5 seconds
        const timer = setTimeout(() => {
            setVisible(false);
            // Call onClose if it's provided
            if (onClose) onClose(); 
        }, 5000);

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
    }, [onClose]);

    const handleClose = () => {
        setVisible(false);
        if (onClose) onClose(); 
    };

    if (!visible) return null;

    return createPortal(
        <Box
            sx={{
                position: "absolute",
                top: 20,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10000000000,
            }}
        >
            <Alert
                severity={variant}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    "& .MuiAlert-action": {
                        p: 0,
                        margin: 0,
                    },
                }}
                action={
                    <IconButton aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                }
            >
                {children}
            </Alert>
        </Box>,
        document.body,
    );
}

export default AlertMessage;
// =========== End AlertMessage ===========