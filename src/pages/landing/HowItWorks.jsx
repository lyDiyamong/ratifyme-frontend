import { Box, Card, Typography, Switch, Button, Grid, TextField, Divider, Stack } from "@mui/material";
import LandingContainer from "../../components/styles/LandingContainer";
import theme from "../../assets/themes";
import { Check } from "@mui/icons-material";
import BadgeDetail from "../../assets/images/BadgeDetail.svg";
import BadgeDetailEarner from "../../assets/images/BadgeDetailEarner.svg";
import Institution from "../../assets/images/Institution.svg";
import { display } from "@mui/system";
import BenefitGrid from "./BenefitGrid";

const HowItWorks = () => {
    return (
        <LandingContainer sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Typography variant="h1" fontWeight={theme.fontWeight.semiBold}>
                How it works
            </Typography>
            <Stack
                variant="outlined"
                sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: "#FAFAFA",
                    border: "1px solid #E4E5EB",
                    flexDirection: "column",
                    alignItems: "center",
                    "@media (min-width: 1000px)": {
                        flexDirection: "row",
                    },
                    // Book grid background style with thicker, semi-transparent lines
                    backgroundImage: `
            linear-gradient(0deg, transparent 99.2%, rgba(0, 0, 0, 0.1) 100%),
            linear-gradient(90deg, transparent 99.2%, rgba(0, 0, 0, 0.1) 100%)
        `,
                    backgroundSize: "80px 80px",
                    backgroundBlendMode: "multiply",
                }}
            >
                {/* Step Label */}
                <Box display="flex" flexDirection="column" justifyContent="start" alignItems="start " mb={2} padding={2} gap={4}>
                    <Box
                        sx={{
                            backgroundColor: "#FFF5CD",
                            color: "#1F2937",
                            borderRadius: "8px",
                            px: 1,
                            py: 0.5,
                            fontWeight: "bold",
                            border: "1px solid #FCD34D",
                        }}
                    >
                        Institution
                    </Box>

                    <Typography variant="h2" fontWeight={theme.fontWeight.semiBold}>
                        Bootstrap straight from your web app
                    </Typography>
                    <Typography variant="h4">
                        Copy and paste your web app url into ToDesktop. Customise your app design, app icon and window frame UI
                        with no code.
                    </Typography>

                    <Stack gap={3}>
                        <Stack
                            sx={{
                                flexDirection: "row",
                                "@media (max-width: 500px)": {
                                    flexDirection: "column",
                                },
                            }}
                            gap={4}
                        >
                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.text.main,
                                        textDecoration: "underline",
                                        textUnderlineOffset: "3px",
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>

                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.text.main,
                                        textDecoration: "underline",
                                        textUnderlineOffset: "3px",
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack
                            sx={{
                                flexDirection: "row",
                                "@media (max-width: 500px)": {
                                    flexDirection: "column",
                                },
                            }}
                            gap={4}
                        >
                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.text.main,
                                        textDecoration: "underline",
                                        textUnderlineOffset: "3px",
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>

                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.text.main,
                                        textDecoration: "underline",
                                        textUnderlineOffset: "3px",
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack
                            sx={{
                                flexDirection: "row",
                                "@media (max-width: 500px)": {
                                    flexDirection: "column",
                                },
                            }}
                            gap={4}
                        >
                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.text.main,
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>

                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.text.main,
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>

                <Box component="img" src={BadgeDetail} alt="Image" sx={{ maxWidth: 500, width: "100%" }} />
            </Stack>

            <Stack
                variant="outlined"
                sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: "#FAFAFA",
                    border: "1px solid #E4E5EB",
                    flexDirection: "column",
                    alignItems: "center",
                    "@media (min-width: 1000px)": {
                        flexDirection: "row",
                    },
                }}
            >
                {/* Step Label */}
                <Box display="flex" flexDirection="column" justifyContent="start" alignItems="start " mb={2} padding={2} gap={4}>
                    <Box
                        sx={{
                            backgroundColor: "#FFF5CD",
                            color: "#1F2937",
                            borderRadius: "8px",
                            px: 1,
                            py: 0.5,
                            fontWeight: "bold",
                            border: "1px solid #FCD34D",
                        }}
                    >
                        Issuer
                    </Box>

                    <Typography variant="h2" fontWeight={theme.fontWeight.semiBold}>
                        Bootstrap straight from your web app
                    </Typography>
                    <Typography variant="h4">
                        Copy and paste your web app url into ToDesktop. Customise your app design, app icon and window frame UI
                        with no code.
                    </Typography>

                    <Stack gap={3}>
                        <Stack
                            sx={{
                                flexDirection: "row",
                                "@media (max-width: 500px)": {
                                    flexDirection: "column",
                                },
                            }}
                            gap={4}
                        >
                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.text.main,
                                        textDecoration: "underline",
                                        textUnderlineOffset: "3px",
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>

                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.text.main,
                                        textDecoration: "underline",
                                        textUnderlineOffset: "3px",
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack
                            sx={{
                                flexDirection: "row",
                                "@media (max-width: 500px)": {
                                    flexDirection: "column",
                                },
                            }}
                            gap={4}
                        >
                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.text.main,
                                        textDecoration: "underline",
                                        textUnderlineOffset: "3px",
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>

                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.text.main,
                                        textDecoration: "underline",
                                        textUnderlineOffset: "3px",
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack
                            sx={{
                                flexDirection: "row",
                                "@media (max-width: 500px)": {
                                    flexDirection: "column",
                                },
                            }}
                            gap={4}
                        >
                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.text.main,
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>

                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.text.main,
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>

                <Box component="img" src={BadgeDetailEarner} alt="Image" sx={{ maxWidth: 500, width: "100%" }} />
            </Stack>

            <BenefitGrid />
            
            <Stack
                variant="outlined"
                sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: "#1C1C20",
                    border: "1px solid #E4E5EB",
                    flexDirection: "column",
                    alignItems: "center",
                    "@media (min-width: 1000px)": {
                        flexDirection: "row",
                    },
                    // High-contrast book grid background with visible lines
                    backgroundImage: `
      linear-gradient(0deg, transparent 96.5%, rgba(200, 200, 200, 0.4) 100%),
      linear-gradient(90deg, transparent 96.5%, rgba(200, 200, 200, 0.4) 100%)
    `,
                    backgroundSize: "80px 80px",
                    backgroundBlendMode: "overlay",
                }}
            >
                {/* Step Label */}
                <Box display="flex" flexDirection="column" justifyContent="start" alignItems="start " mb={2} padding={2} gap={4}>
                    <Box
                        sx={{
                            backgroundColor: "#3138F2",
                            color: "#FFFF",
                            borderRadius: "8px",
                            px: 1,
                            py: 0.5,
                            fontWeight: "bold",
                            border: "1px solid #FFFF",
                        }}
                    >
                        Earner
                    </Box>

                    <Typography variant="h2" fontWeight={theme.fontWeight.semiBold} color={theme.palette.customColors.white}>
                        Bootstrap straight from your web app
                    </Typography>
                    <Typography variant="h4" color={theme.palette.customColors.white}>
                        Copy and paste your web app url into ToDesktop. Customise your app design, app icon and window frame UI
                        with no code.
                    </Typography>

                    <Stack gap={3}>
                        <Stack
                            sx={{
                                flexDirection: "row",
                                "@media (max-width: 500px)": {
                                    flexDirection: "column",
                                },
                            }}
                            gap={4}
                        >
                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.customColors.white,
                                        textDecoration: "underline",
                                        textUnderlineOffset: "3px",
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>

                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.customColors.white,
                                        textDecoration: "underline",
                                        textUnderlineOffset: "3px",
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack
                            sx={{
                                flexDirection: "row",
                                "@media (max-width: 500px)": {
                                    flexDirection: "column",
                                },
                            }}
                            gap={4}
                        >
                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.customColors.white,
                                        textDecoration: "underline",
                                        textUnderlineOffset: "3px",
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>

                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.customColors.white,
                                        textDecoration: "underline",
                                        textUnderlineOffset: "3px",
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack
                            sx={{
                                flexDirection: "row",
                                "@media (max-width: 500px)": {
                                    flexDirection: "column",
                                },
                            }}
                            gap={4}
                        >
                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.customColors.white,
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>

                            <Stack sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                <Check sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.customColors.white,
                                    }}
                                >
                                    Institution role
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>

                <Box component="img" src={Institution} alt="Image" sx={{ maxWidth: 500, width: "100%" }} />
            </Stack>
        </LandingContainer>
    );
};

export default HowItWorks;
