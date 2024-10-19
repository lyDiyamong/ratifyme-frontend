import React, { useState } from "react";
import { Button, CardMedia, Stack, Typography } from "@mui/material";
import theme from "../../../assets/themes";
import AcademicInfo from "./academicInfo";
import {
    useFetchAcademicBackgroundByUserQuery,
    useFetchEarnerQuery,
} from "../../../store/api/earnerManagement/earnerApis";
import { useFetchInfoUserByIdQuery } from "../../../store/api/users/userInfoProfileApi";
import { useSelector } from "react-redux";
import FormatDate from "../../../utils/formatDate";
import { Box } from "@mui/system";
import StatusCode from "../../../assets/images/Search-Illustation.svg";
import { LoupeRounded } from "@mui/icons-material";
import AddAcademicModal from "./AddAcademicModal";

const AcademicBackground = () => {
    const { userId } = useSelector((state) => state.global);
    const { data: response, isLoading, isError } = useFetchEarnerQuery();
    const { data: info } = useFetchInfoUserByIdQuery(userId, { skip: !userId });
    const { data: academicBackgroundData } = useFetchAcademicBackgroundByUserQuery({ userId });

    console.log("academicBackgroundData😭", academicBackgroundData);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (academicData) => {
        console.log("New Academic Entry:", academicData);
        handleClose();
    };

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error loading data.</Typography>;

    return (
        <Stack
            sx={{
                backgroundColor: "#fff",
                p: 3,
                borderRadius: "12px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                gap: 3,
            }}
        >
            <Stack flexDirection={{ md: "row", xss: "column" }} justifyContent="space-between" gap={1}>
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
                        This highlights your educational journey, showcasing the diverse experiences and knowledge.
                    </Typography>
                </Stack>
                <Stack alignItems="end" justifyContent="end">
                    <Button
                        startIcon={<LoupeRounded />}
                        onClick={handleOpen}
                        sx={{
                            backgroundColor: theme.palette.action.hover,
                            px: 2,
                            "&:hover": {
                                backgroundColor: theme.palette.action.selected,
                            },
                        }}
                    >
                        Academic
                    </Button>
                </Stack>
            </Stack>

            <Stack
                sx={{
                    justifyContent: academicBackgroundData?.length === 0 ? "center" : "start",
                    gap: 4,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    "& > *": {
                        flexBasis: "calc(33.33% - 24px)",
                        "@media (max-width: 1500px)": {
                            flexBasis: "calc(33.33% - 24px)",
                        },
                        "@media (max-width: 1450px)": {
                            flexBasis: "calc(50% - 24px)",
                        },
                        "@media (max-width: 600px)": {
                            flexBasis: "100%",
                        },
                    },
                }}
            >
                {academicBackgroundData?.data?.length === 0 ? (
                    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
                        <Typography variant="h6" mt={2} textAlign="center" color={theme.palette.text.secondary}>
                            There are no Academic Background!
                        </Typography>
                        <CardMedia
                            component="img"
                            image={StatusCode}
                            alt="No badges found"
                            sx={{ maxWidth: 400, width: "100%" }}
                        />
                    </Box>
                ) : (
                    academicBackgroundData?.data
                        ?.filter((data) => data.userId === userId)
                        .map((data, index) => (
                            <AcademicInfo
                                key={index}
                                academicData={{
                                    userId: data.id,
                                    FieldOfStudy: data.FieldOfStudy?.name || "N/A",
                                    academicYear: FormatDate(data.academicYear) || "N/A",
                                    academicLevel: data.AcademicLevel?.name || "N/A",
                                }}
                            />
                        ))
                )}
            </Stack>

            <AddAcademicModal open={open} onClose={handleClose} onSubmit={handleSubmit} userId={userId} />
        </Stack>
    );
};

export default AcademicBackground;
