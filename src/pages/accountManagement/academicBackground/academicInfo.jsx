import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardContent, CardHeader, Divider, Stack } from "@mui/material";
import { AccountBalanceRounded, CalendarMonth, School } from "@mui/icons-material";
import theme from "../../../assets/themes";

// Data: Program Labels, Descriptions, and Years
const steps = [
    {
        label: "Computer Science",
        year: "2018 - 2022",
        description: `Focused on algorithms, data structures, and software development. 
                  Includes projects in machine learning, web development, and systems design.`,
        fieldStudy: "Computer Science",
        academicLevel: "Diploma",
        academicYear: "22-12-2022",
    },
    {
        label: "Information Technology",
        year: "2019 - 2023",
        description: `Covers networking, cybersecurity, and IT infrastructure management. 
                  Students gain practical experience with cloud platforms and enterprise tools.`,
        fieldStudy: "Information Technology",
        academicLevel: "Diploma",
        academicYear: "22-12-2022",
    },
    {
        label: "Data Science",
        year: "2021 - 2024",
        description: `Emphasizes statistical analysis, data visualization, and machine learning.
                  Hands-on with Python, R, and big data frameworks such as Hadoop and Spark.`,
        fieldStudy: "Data Science",
        academicLevel: "Diploma",
        academicYear: "22-12-2022",
    },
];

const AcademicInfo = () => {
    return (
        <Box sx={{ maxWidth: 800, margin: "0 auto", p: 3 }}>
            {steps.map((step, index) => (
                <Card key={index} sx={{ mb: 3, boxShadow: theme.customShadows.default }}>
                    <CardHeader
                        title={
                            <Typography variant="h4" fontWeight={theme.fontWeight.semiBold} color={theme.palette.text.primary}>
                                {step.label}
                            </Typography>
                        }
                        subheader={
                            <Typography variant="caption" sx={{ color: "gray" }}>
                                {step.year}
                            </Typography>
                        }
                    />
                    <Divider />
                    <CardContent>
                        <Stack spacing={2}>
                            <Typography variant="h5" fontWeight={theme.fontWeight.semiBold} sx={{ display: "flex", alignItems: "center" }}>
                                <School sx={{ marginRight: 1, color: theme.palette.primary.main }} />
                                Academic Level:{" "}
                                <Typography component="span" sx={{ color: theme.palette.text.secondary, marginLeft: 1 }}>
                                    {step.academicLevel}
                                </Typography>
                            </Typography>

                            <Typography variant="h5" fontWeight={theme.fontWeight.semiBold} sx={{ display: "flex", alignItems: "center" }}>
                                <CalendarMonth sx={{ marginRight: 1, color: theme.palette.primary.main }} />
                                Academic Year:{" "}
                                <Typography component="span" sx={{ color: theme.palette.text.secondary, marginLeft: 1 }}>
                                    {step.academicYear}
                                </Typography>
                            </Typography>

                            <Typography variant="h5" fontWeight={theme.fontWeight.semiBold} sx={{ display: "flex", alignItems: "center" }}>
                                <AccountBalanceRounded sx={{ marginRight: 1, color: theme.palette.primary.main }} />
                                Field of Study:{" "}
                                <Typography component="span" sx={{ color: theme.palette.text.secondary, marginLeft: 1 }}>
                                    {step.fieldStudy}
                                </Typography>
                            </Typography>

                            <Typography>{step.description}</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default AcademicInfo;
