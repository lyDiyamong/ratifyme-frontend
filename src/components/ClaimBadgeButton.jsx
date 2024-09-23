import { Button } from "@mui/material";
import theme from "../assets/themes";

const ClaimBadgeButton = () => {
    return (
        <Button
            sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.customColors.white,
                fontFamily: theme.typography.fontFamily,
            }}
        >
            Claim Badge
        </Button>
    );
};

export default ClaimBadgeButton;
