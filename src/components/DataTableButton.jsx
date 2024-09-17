import Button from "@mui/material/Button";
import theme from "../assets/themes";
const ReusableButton = ({ label, onClick }) => {
    return (
        <Button
            onClick={onClick}
            size="small"
            sx={{
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none", // Remove any shadow
                color: "inherit", // Ensure text inherits the color or use a specific color
                "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)", // Optional: add a light hover effect
                },
                textTransform: "capitalize",
            }}
        >
            {label}
        </Button>
    );
};

export default ReusableButton;
