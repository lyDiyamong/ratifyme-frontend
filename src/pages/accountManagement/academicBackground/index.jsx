import { Stack, Typography } from "@mui/material";
import theme from "../../../assets/themes";
import AcademicInfo from "./academicInfo";

const AcademicBackground = () => {
    return (
        <Stack
            sx={{
                maxWidth: 1200,
                mx: "auto",
                backgroundColor: "#fff",
                p: 3,
                borderRadius: "12px",
                boxShadow: theme.customShadows.default,
                // border: '1px solid #E2E2E2',
                gap: 3,
            }}
        >
            <Stack flexDirection="column">
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: theme.typography.h2,
                        fontWeight: theme.fontWeight.bold,
                        color: theme.palette.text.primary,
                        lineHeight: 1.8,
                    }}
                >
                    My Academic Background
                </Typography>
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: theme.typography.body2,
                        color: theme.palette.text.secondary,
                    }}
                >
                    Your new password must be different from previous used passwords.
                </Typography>
            </Stack>
            <AcademicInfo />
            {/* <AcademicInfo />
            <AcademicCard /> */}
        </Stack>
    );
};

export default AcademicBackground;
