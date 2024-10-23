// MUI Import
import Button from "@mui/material/Button";

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
    return (
        <Button
            onClick={onClick}
            size="small"
            sx={{
                backgroundColor: "transparent",
                color: "inherit",
                "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
                textTransform: "capitalize",
            }}
        >
            {label}
        </Button>
    );
};

export default ActionButton;
// ============ End Action Button ============ 


