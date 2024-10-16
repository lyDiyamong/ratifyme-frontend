import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardContent, CardHeader, Stack } from "@mui/material";
import { AccountBalanceRounded, CalendarMonth, School } from "@mui/icons-material";
import theme from "../../../assets/themes";

const AcademicInfo = ({ academicData }) => {
    return (
        <Box>
            <Card sx={{ boxShadow: theme.customShadows.default }}>
                <CardHeader
                    sx={{ backgroundColor: "#E5F3FF" }}
                    title={
                        <Box display="flex" alignItems="center">
                            <Typography
                                variant="h4"
                                fontWeight={theme.fontWeight.semiBold}
                                color={theme.palette.text.primary}
                            >
                                {academicData.label}
                            </Typography>
                        </Box>
                    }
                    subheader={
                        <Typography variant="caption" sx={{ color: "gray" }}>
                            {academicData.year}
                        </Typography>
                    }
                />
                <CardContent>
                    <Stack spacing={2}>
                        <Typography
                            variant="h5"
                            fontWeight={theme.fontWeight.semiBold}
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <School sx={{ marginRight: 1, color: theme.palette.text.secondary }} />
                            Academic Level:{" "}
                            <Typography
                                component="span"
                                sx={{ color: theme.palette.text.secondary, marginLeft: 1 }}
                            >
                                {academicData.academicLevel}
                            </Typography>
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={theme.fontWeight.semiBold}
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <CalendarMonth sx={{ marginRight: 1, color: theme.palette.text.secondary }} />
                            Academic Year:{" "}
                            <Typography
                                component="span"
                                sx={{ color: theme.palette.text.secondary, marginLeft: 1 }}
                            >
                                {academicData.academicYear}
                            </Typography>
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={theme.fontWeight.semiBold}
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <AccountBalanceRounded sx={{ marginRight: 1, color: theme.palette.text.secondary }} />
                            Field of Study:{" "}
                            <Typography
                                component="span"
                                sx={{ color: theme.palette.text.secondary, marginLeft: 1 }}
                            >
                                {academicData.fieldStudy}
                            </Typography>
                        </Typography>

                        <Typography>{academicData.description}</Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AcademicInfo;
