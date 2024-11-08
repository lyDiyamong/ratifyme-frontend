// MUI import
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

/**
 * ActionButton Component
 *
 * @param {string} label - The text to be displayed on the button.
 * @param {function} onClick - The function to be called when the button is clicked.
 *
 * @returns {JSX.Element} A reusable Material-UI Button component with custom styles.
 */

// ============ Start Action Button ============ 
// This button is a reusable component that receives two props
const ActionButton = ({ label, onClick }) => {
    // Get roleId from the global state
    const { roleId } = useSelector((state) => state.global);

    return (
        <Button
            onClick={onClick}
            size="small"
            sx={{
                backgroundColor: roleId === 1 ? "primary.main" : "transparent",
                color: roleId === 1 ? "white" : "inherit",
                fontWeight: roleId === 1 ? "bold" : "normal",
                "&:hover": {
                    backgroundColor: roleId === 1 ? "primary.dark" : "rgba(0, 0, 0, 0.04)",
                },
                textTransform: "capitalize",
                borderRadius: roleId === 1 ? "8px" : "4px",
            }}
        >
            {label}
        </Button>
    );
};

export default ActionButton;
// ============ End Action Button ============
