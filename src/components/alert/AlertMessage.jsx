// React import
import { useEffect, useState } from "react";

// MUI import
import Alert from "@mui/material/Alert";

/**
 *
 * @param {String}  variant variant of alert message (["success", "info", "warning", "error"])
 * @param {String}  children message
 * @return {JSX.Element} The rendered AlertMessage component.
 */
const AlertMessage = ({ variant = "success", children }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Set a timer to hide the alert after 2 seconds
        const timer = setTimeout(() => {
            setVisible(false);
        }, 2000);

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
    }, []);
    // Not rendering if not visible
    if (!visible) return null;
    return (
        <>
            <Alert severity={variant}>{children}</Alert>
        </>
    );
};

export default AlertMessage;
