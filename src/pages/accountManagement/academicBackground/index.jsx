import { CardMedia, Stack, Typography } from "@mui/material";
import theme from "../../../assets/themes";
import AcademicInfo from "./academicInfo";
import { useFetchEarnerQuery } from "../../../store/api/earnerManagement/earnerApis";
import { useFetchInfoUserByIdQuery } from "../../../store/api/users/userInfoProfileApi";
import { useSelector } from "react-redux";
import FormatDate from "../../../utils/formatDate";
import { Box } from "@mui/system";
import StatusCode from "../../../assets/images/Search-Illustation.svg";

const AcademicBackground = () => {
    const { userId } = useSelector((state) => state.global);
    const { data: response, isLoading, isError } = useFetchEarnerQuery();

    // Fetch user data and bio
    const { data: info } = useFetchInfoUserByIdQuery(userId, { skip: !userId });

    const earnerData = response?.data;
    console.log("User Id", info?.data?.id);
    console.log("Data", response);

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

            <Stack
                direction="row"
                sx={{
                    flexWrap: "wrap",
                    justifyContent: earnerData?.length === 0 ? "center" : "start",
                    gap: 4,
                    "& > *": {
                        flexBasis: "calc(33.33% - 24px)",
                        "@media (max-width: 1000px)": {
                            flexBasis: "calc(50% - 24px)",
                        },
                        "@media (max-width: 700px)": {
                            flexBasis: "100%",
                        },
                    },
                }}
            >
                {earnerData?.length === 0 ? (
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
                    earnerData
                        ?.filter((data) => data.userId === userId)
                        .map((data, index) => (
                            <AcademicInfo
                                key={index}
                                academicData={{
                                    label: data.AcademicBackground?.FieldOfStudy?.name || "N/A",
                                    year: FormatDate(data.AcademicBackground?.academicYear) || "N/A",
                                    description:
                                        data.AcademicBackground?.fieldOfStudyId.description ||
                                        "No description available",
                                    fieldStudy: data.AcademicBackground?.fieldOfStudyId.name || "N/A",
                                    academicLevel: data.AcademicBackground?.AcademicLevel?.name || "N/A",
                                    academicYear: FormatDate(data.AcademicBackground?.academicYear) || "N/A",
                                }}
                            />
                        ))
                )}
            </Stack>
        </Stack>
    );
};

export default AcademicBackground;
