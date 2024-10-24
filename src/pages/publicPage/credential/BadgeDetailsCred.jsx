import { Box, Stack } from "@mui/system";
import theme from "../../../assets/themes";
import { Card, CardContent, Typography } from "@mui/material";
import { AccountBalanceOutlined, EmojiEventsOutlined, EventAvailableOutlined, PendingActionsOutlined } from "@mui/icons-material";

const BadgeDetailsCred = ({ BadgeName, Criteria, StartDate, EndDate }) => {
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
                        Badge Details
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        This Badge Details is related to the Badge.
                    </Typography>
                </Stack>

                <Card
                    sx={{
                        borderRadius: 2,
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#fff",
                        border: "1px solid #F5F5F7",
                    }}
                >
                    <CardContent
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        <AccountBalanceOutlined
                            sx={{
                                color: theme.palette.primary.main,
                                fontSize: 30,
                            }}
                        />
                        <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                            Badge Name
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {BadgeName}
                        </Typography>
                    </CardContent>
                </Card>

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
                    <Card
                        sx={{
                            width: 150,
                            height: 150,
                            borderRadius: 2,
                            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fff",
                            border: "1px solid #F5F5F7",
                        }}
                    >
                        <CardContent
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            <EmojiEventsOutlined
                                sx={{
                                    color: theme.palette.primary.main,
                                    fontSize: 30,
                                }}
                            />
                            <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                                Criteria
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {Criteria}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card
                        sx={{
                            width: 150,
                            height: 150,
                            borderRadius: 2,
                            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fff",
                            border: "1px solid #F5F5F7",
                        }}
                    >
                        <CardContent
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            <PendingActionsOutlined
                                sx={{
                                    color: theme.palette.primary.main,
                                    fontSize: 30,
                                }}
                            />
                            <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                                Start Date
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {StartDate}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card
                        sx={{
                            width: 150,
                            height: 150,
                            borderRadius: 2,
                            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fff",
                            border: "1px solid #F5F5F7",
                        }}
                    >
                        <CardContent
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            <EventAvailableOutlined
                                sx={{
                                    color: theme.palette.primary.main,
                                    fontSize: 30,
                                }}
                            />
                            <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                                End Date
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {EndDate}
                            </Typography>
                        </CardContent>
                    </Card>
                </Stack>
            </Stack>
        </Box>
    );
};

export default BadgeDetailsCred;
