import { Box, Grid, Stack, Typography } from "@mui/material";
import theme from "../../../assets/themes";

/**
 * ProfileInfo Component
 *
 * This component dynamically renders profile information based on the provided `profileData` prop.
 * It allows changing the icons and data depending on the user's role or other factors.
 *
 * @param {Array} details - An array of detail objects, where each object contains an icon, title, and value for displaying additional profile information.
 *
 * @returns {JSX.Element} A responsive grid displaying profile information.
 */

// Utility function to get value from nested objects based on a string key path
const getValue = (obj, keyPath) => {
    return keyPath.split(".").reduce((o, k) => (o || {})[k], obj);
};

const ProfileInfo = ({ details, item }) => {
    return (
        <Grid
            container
            sx={{
                mt: "50px",
                justifyContent: "flex-start",
                columnGap: { xss: "22px", sm: "32px" },
                rowGap: { xss: "22px", sm: "32px" },
            }}
        >
            {details.map(({ icon, label, valueKey }, index) => (
                <Grid
                    item
                    key={index}
                    direction={"row"}
                    xs={4}
                    sm={4}
                    md={4}
                    lg={3}
                    sx={{
                        gap: "12px",
                        minWidth: { xs: "170px", sm: "200px" },
                        "@media(max-width: 480px)": { minWidth: "145px", height: "35px" },
                        height: "60px",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}
                >
                    <Box component="span">{icon}</Box>
                    <Stack gap={"5px"} sx={{ textAlign: "left" }}>
                        <Typography sx={{ fontSize: theme.typography.h5, fontWeight: theme.fontWeight.bold }}>
                            {label}
                        </Typography>
                        <Typography sx={{ fontSize: theme.typography.h6 }}>
                            {getValue(item, valueKey) || "N/A"}
                        </Typography>
                    </Stack>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProfileInfo;
