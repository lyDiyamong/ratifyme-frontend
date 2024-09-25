import { Button } from "@mui/material";
import theme from "../assets/themes";

const ClaimBadgeButton = () => {
    return (
        <Button
            sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.customColors.white,
                fontSize: theme.typography.body1,
                fontWeight: theme.fontWeight.bold,
                borderRadius: theme.customShape.btn,
                px: 3,
            }}
        >
            Claim Badge
        </Button>
    );
};

export default ClaimBadgeButton;
