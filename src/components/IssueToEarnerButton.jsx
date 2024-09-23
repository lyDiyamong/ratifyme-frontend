import { Button } from "@mui/material";
import theme from "../assets/themes";

const IssueToEarnerButton = () => {
    return (
        <Button
            sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.customColors.white,
                fontFamily: theme.typography.fontFamily,
            }}
        >
            Add earner to badge
        </Button>
    );
};

export default IssueToEarnerButton;
