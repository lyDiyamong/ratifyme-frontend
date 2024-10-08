// MUI Import
import { Box, Card, CardContent, Typography, Button, Stack } from "@mui/material";

// Custom Import
import theme from "../../../../assets/themes/index"; 

// =========== Start Profile Setting ===========
const ProfileSetting = () => {
    const profileData = {
        education: "Stanford University",
        languages: "English, Spanish, Italian",
        department: "Product Design",
        workHistory: "Google, Facebook",
        organization: "Simmmple Web LLC",
        birthday: "20 July 1986",
    };

    // Define the profile details in an array for dynamic rendering
    const profileDetails = [
        { label: "Education", value: profileData.education },
        { label: "Languages", value: profileData.languages },
        { label: "Department", value: profileData.department },
        { label: "Work History", value: profileData.workHistory },
        { label: "Organization", value: profileData.organization },
        { label: "Birthday", value: profileData.birthday },
    ];

    return (
        <Stack spacing={2} sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: theme.fontWeight.semiBold }}>
                Profile Settings
            </Typography>
            <Button
                sx={{
                    color: theme.palette.primary.main,
                    fontWeight: theme.fontWeight.semiBold,
                    backgroundColor: theme.palette.action.hover,
                    maxWidth: 200,
                    height: 40,
                    textTransform: "none",
                    borderRadius: theme.customShape.btn,
                }}
            >
                Go to Settings
            </Button>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
            >
                {profileDetails.map((detail, index) => (
                    <Box
                        key={index}
                        sx={{
                            flex: "1 1 calc(50% - 16px)",
                            minWidth: "280px",
                        }}
                    >
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{detail.label}</Typography>
                                <Typography>{detail.value}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Stack>
    );
};

export default ProfileSetting;
// =========== End Profile Setting ===========