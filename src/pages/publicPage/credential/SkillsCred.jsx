import { Box, Stack } from "@mui/system";
import theme from "../../../assets/themes";
import { Button, Typography } from "@mui/material";

const SkillsCred = () => {
    return (
        <Box
            elevation={3}
            sx={{
                p: 2,
                backgroundColor: theme.palette.customColors.white,
                borderRadius: theme.customShape.input,
                border: "1px solid #F5F5F7",
            }}
        >
            <Stack spacing={2}>
                <Stack>
                    <Typography variant="h4" fontWeight={theme.fontWeight.semiBold}>
                        Skills
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        This Skills is related to the Badge.
                    </Typography>
                </Stack>

                <Stack
                    sx={{
                        justifyContent: "start",
                        gap: 4,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        "& > *": {
                            flexBasis: "calc(33.33% - 24px)",
                            "@media (max-width: 1500px)": {
                                flexBasis: "calc(33.33% - 24px)",
                            },
                            "@media (max-width: 1200px)": {
                                flexBasis: "calc(50% - 24px)",
                            },
                            "@media (max-width: 600px)": {
                                flexBasis: "100%",
                            },
                        },
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{ pointerEvents: "none", borderRadius: theme.customShape.btn, borderColor: "#C7E4FF" }}
                    >
                        Java
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ pointerEvents: "none", borderRadius: theme.customShape.btn, borderColor: "#C7E4FF" }}
                    >
                        Python
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ pointerEvents: "none", borderRadius: theme.customShape.btn, borderColor: "#C7E4FF" }}
                    >
                        JavaScript
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ pointerEvents: "none", borderRadius: theme.customShape.btn, borderColor: "#C7E4FF" }}
                    >
                        Agular
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ pointerEvents: "none", borderRadius: theme.customShape.btn, borderColor: "#C7E4FF" }}
                    >
                        React Native
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ pointerEvents: "none", borderRadius: theme.customShape.btn, borderColor: "#C7E4FF" }}
                    >
                        Node Js
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default SkillsCred;
