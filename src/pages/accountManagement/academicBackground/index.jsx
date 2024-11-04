// React library import
import { useState } from "react";
import { useSelector } from "react-redux";

// MUI import
import { Button, CardMedia, Stack, Typography } from "@mui/material";
import { LoupeRounded } from "@mui/icons-material";
import { Box } from "@mui/system";

// Custom import
import StatusCode from "../../../assets/images/Search-Illustation.svg";
import AcademicInfo from "./academicInfo";
import AddAcademicModal from "./AddAcademicModal";
import FormatDate from "../../../utils/formatDate";
import theme from "../../../assets/themes";

// API import
import { useFetchAcademicBackgroundByUserQuery } from "../../../store/api/earnerManagement/earnerApis";

const AcademicBackground = () => {
    const { userId } = useSelector((state) => state.global);
    const { data: academicBackgroundData } = useFetchAcademicBackgroundByUserQuery({ userId });

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (academicData) => {
        handleClose();
    };

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

            {academicBackgroundData?.data?.length === 0 ? (
                <Stack
                    sx={{
                        justifyContent: "center",
                        gap: 4,
                        flexDirection: "row",
                    }}
                >
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
                </Stack>
            ) : (
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
                            "@media (max-width: 1450px)": {
                                flexBasis: "calc(50% - 24px)",
                            },
                            "@media (max-width: 600px)": {
                                flexBasis: "100%",
                            },
                        },
                    }}
                >
                    {academicBackgroundData?.data
                        ?.filter((data) => data.userId === userId)
                        .map((data, index) => (
                            <AcademicInfo
                                key={index}
                                academicData={{
                                    academicId: data.id,
                                    userId,
                                    fieldOfStudyId: data.FieldOfStudy?.name || "N/A",
                                    academicYear: FormatDate(data.academicYear) || "N/A",
                                    academicLevelId: data.AcademicLevel?.name || "N/A",
                                }}
                            />
                        ))}
                </Stack>
            )}

            <AddAcademicModal open={open} onClose={handleClose} onSubmit={handleSubmit} userId={userId} />
        </Stack>
    );
};

export default AcademicBackground;
