import { Chip } from "@mui/material";
import { CheckCircleOutline, ErrorOutline, AccessAlarm } from "@mui/icons-material";
import theme from "../../assets/themes"; // Assuming you have a theme setup

const InviteUserStatus = ({ status, expiredInvitation, isAccountCreated }) => {
    // Function to determine the color, label, and icon based on the status
    const getStatusChipProps = () => {
        if (status === true && isAccountCreated === true) {
            return {
                label: "Accepted",
                color: theme.palette.customColors.green300,
                backgroundColor: theme.palette.customColors.green100,
                icon: <CheckCircleOutline fontSize="small" color={theme.palette.customColors.green300} />,
            };
        }
        if (expiredInvitation) {
            return {
                label: "Expired",
                color: theme.palette.customColors.red300,
                backgroundColor: theme.palette.customColors.red100,
                icon: <ErrorOutline fontSize="small" color={theme.palette.customColors.red300} />,
            };
        }
        return {
            label: "Pending",
            color: theme.palette.customColors.orange400,
            backgroundColor: theme.palette.customColors.orange100,
            icon: <AccessAlarm fontSize="small" color={theme.palette.customColors.orange200} />,
        };
    };

    const chipProps = getStatusChipProps();

    return (
        <Chip
            label={chipProps.label}
            icon={chipProps.icon}
            size="small"
            sx={{
                backgroundColor: chipProps.backgroundColor,
                color: chipProps.color,
                borderRadius: theme.customShape.section,
            }}
        />
    );
};

export default InviteUserStatus;
