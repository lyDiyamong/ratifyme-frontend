// MUI component
import { Stack } from "@mui/material";

// Custom import
import theme from "../../../assets/themes";
import DashboardContainer from "../../../components/styles/DashboardContainer";

// Image import
import ChangePassword from "../../../assets/images/ChangePassword.svg"

const ChangePasswordForm = () => {
    return (
        <DashboardContainer>
            <Stack
                component="section"
                flexDirection={{ xs: "column", md: "row" }}
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "32px",
                    bgcolor: theme.palette.customColors.white,
                }}
            >
              Hello
            </Stack>
        </DashboardContainer>
    );
};

export default ChangePasswordForm;
