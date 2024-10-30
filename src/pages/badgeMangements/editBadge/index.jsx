// React import
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";

// MUI import
import { ArrowBack, ZoomInMapOutlined } from "@mui/icons-material";
import Upload from "@mui/icons-material/Upload";
import SaveAltOutlined from "@mui/icons-material/SaveAltOutlined";
import { Modal, Backdrop } from "@mui/material";
import { Box, Button, Stack, Typography } from "@mui/material";

// Custom import
import EditCoreElement from "./EditCoreElement";
import EditMetadata from "./EditMetadata";
import EditOptionalElements from "./EditOptionalElements";
import PageTitle from "../../../components/PageTitle";
import DashboardContainer from "../../../components/styles/DashboardContainer";
import { useFetchAchievementTypeQuery } from "../../../store/api/achievements/achievementTypeApi";
import { useFetchOneBadgeQuery, useUpdateBadgeMutation } from "../../../store/api/badgeManagement/badgeApi";
import theme from "../../../assets/themes";
import AlertMessage from "../../../components/alert/AlertMessage";
import useCatchStatus from "../../../hooks/useCatchStatus";
import badgeSchema from "../../../utils/schema/badgeSchema";
import PageLoading from "../../../components/loading/PageLoading";
import { SpinLoading } from "../../../components/loading/SpinLoading";

const EditBadge = () => {
    const { id: badgeId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Api hook
    const [updateBadge, { reset: updatedReset, isSuccess, isError, isLoading: updateBadgeLoading }] = useUpdateBadgeMutation();

    const { data: badgeResponse, refetch } = useFetchOneBadgeQuery(badgeId);
    const badgeData = badgeResponse?.data;
    const userID = badgeData?.id;

    const { data: achievementType } = useFetchAchievementTypeQuery();
    const allAchievementTypes = achievementType?.data || [];

    // State hook
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayImg, setDisplayImg] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);

    // React hook form
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(badgeSchema),
    });

    const parsedExpirationDate = dayjs(badgeData?.endDate);

    // Status custom hook
    const [message, setMessage] = useCatchStatus(isSuccess || isError, isSuccess ? "Updated succesfully" : "Updated failed");

    // Handle submit
    const onSubmit = async (data) => {
        const formData = new FormData();
        // Append core badge details
        appendBadgeDetails(formData, data);
        // Append Achievements
        appendAchievements(formData, data.AchievementTypes, allAchievementTypes);
        // Append Criterias
        appendCriterias(formData, data.narrative);

        // Append the uploaded image to the FormData object (if available)
        if (uploadedImage) {
            formData.append("badgeFile", uploadedImage);
        }

        setLoading(true);
        await updateBadge({ id: badgeId, updatedBadge: formData }).unwrap();
        reset();
        updatedReset();
        navigate(`/dashboard/management/badges/badgeDetail/${userID}`, {
            state: { successMessage: "Badge edited successfully!" },
        });
    };

    // Navigate on successful update
    useEffect(() => {
        if (isSuccess) {
            navigate(`/dashboard/management/badges/badgeDetail/${userID}`);
            refetch();
        }
    }, [isSuccess, navigate, userID]);

    // Helper function to append badge details to FormData
    const appendBadgeDetails = (formData, data) => {
        formData.append("name", data.badgeName);
        formData.append("description", data.badgeDescription);
        formData.append("tags", data.tagsOrLanguage.join(", "));
        formData.append("startedDate", dayjs(data.startedDate) || null);
        formData.append("issuerId", badgeData?.Issuer.id);
        formData.append("endDate", data.endDate);
    };

    // Helper function to append achievements to FormData
    const appendAchievements = (formData, achievementTypes, allAchievementTypes) => {
        achievementTypes?.forEach((achievementName, index) => {
            const achievementType = allAchievementTypes.find((type) => type.name === achievementName);
            if (achievementType) {
                formData.append(`Achievements[${index}][achievementTypeId]`, achievementType.id);
                formData.append(`Achievements[${index}][AchievementType][name]`, achievementName);
            }
        });
    };

    // Helper function to append criteria to FormData
    const appendCriterias = (formData, narrative) => {
        if (narrative) {
            formData.append("Criterias[0][narrative]", narrative);
        }
    };
    // Handle file input change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setDisplayImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Reset form with badge data
    useEffect(() => {
        if (badgeData) {
            // Fetch and process tags
            let tagsValue = [];
            if (typeof badgeData?.tags === "string") {
                tagsValue = badgeData?.tags.split(",").map((tag) => tag.trim());
            } else if (Array.isArray(badgeData?.tags)) {
                tagsValue = badgeData?.tags;
            }
            // Extract criteria narratives
            const criteriaNarratives = badgeData?.Criterias?.map((criteria) => criteria.narrative) || [];
            // Extract achievement type names
            const achievementNames = badgeData?.Achievements?.map((achievement) => achievement.AchievementType.name) || [];

            reset({
                // Core
                narrative: criteriaNarratives.join(", ") || "",
                AchievementTypes: achievementNames,
                // Meta
                badgeName: badgeData?.name || "",
                issuedOn: dayjs(badgeData?.issuedOn) || null,
                startedDate: dayjs(badgeData?.startedDate) || null,
                badgeDescription: badgeData?.description || "",
                tagsOrLanguage: tagsValue || "",
                // Optional
                endDate: parsedExpirationDate || null,
            });

            // Set the uploaded image URL if available
            setDisplayImg(badgeData?.imageUrl || null);
        }
    }, [badgeData]);
    if (updateBadgeLoading) return <PageLoading isLoading={updateBadgeLoading} />;

    return (
        <DashboardContainer sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {message && (
                <AlertMessage variant={isError ? "error" : "success"} onClose={() => setMessage("")}>
                    {message}
                </AlertMessage>
            )}
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                closeAfterTransition
                BackdropComponent={(props) => (
                    <Backdrop
                        {...props}
                        sx={{
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                        }}
                    />
                )}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { md: "40%", xss: "70%" },
                        p: 4,
                    }}
                >
                    <Box
                        component="img"
                        src={displayImg || "https://www.mylittleadventure.com/images/default/default-img.png"}
                        alt="Full size badge"
                        sx={{ width: "100%", height: "auto", borderRadius: "10px" }}
                    />
                </Box>
            </Modal>

            <PageTitle title="Edit Badge" subtitle="Update the details to ensure it accurately represents your achievement." />
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    sx={{
                        my: 3,
                        flexDirection: { md: "row", xss: "column" },
                        width: "100%",
                        justifyContent: "space-between",
                        gap: 3,
                    }}
                >
                    <Stack
                        direction={{ md: "column", sm: "row", xss: "column" }}
                        alignItems="center"
                        gap={3}
                        sx={{
                            p: 3,
                            backgroundColor: theme.palette.customColors.white,
                            borderRadius: theme.customShape.section,
                            boxShadow: theme.customShadows.default,
                            gap: 3,
                        }}
                    >
                        <Stack gap={1} display={{ md: "block", sm: "none", xss: "block" }}>
                            <Typography variant="h4" fontWeight={theme.fontWeight.bold}>
                                Badge Image
                            </Typography>
                            <Typography variant="body1" color="gray">
                                Update your badge image that related to your Badge.
                            </Typography>
                        </Stack>

                        <Stack
                            sx={{
                                maxWidth: "250px",
                                width: "100%",
                                height: "250px",
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    width: { sm: "250px", xss: "100%" },
                                    height: "250px",
                                    backgroundColor: theme.palette.primary.light,
                                    borderRadius: theme.customShape.input,
                                    overflow: "hidden",
                                    "&:hover .hover-overlay": {
                                        visibility: "visible",
                                        opacity: 1,
                                    },
                                }}
                            >
                                <Box
                                    component="img"
                                    onClick={() => setIsModalOpen(true)}
                                    src={displayImg || "https://www.mylittleadventure.com/images/default/default-img.png"}
                                    alt="Badge"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: theme.customShape.input,
                                        objectFit: "cover",
                                        display: "block",
                                        border: "1px solid gray",
                                        cursor: "pointer",
                                    }}
                                />
                            </Box>
                        </Stack>

                        <Stack gap={1}>
                            <Stack gap={1} display={{ md: "none", sm: "block", xss: "none" }}>
                                <Typography variant="h4" fontWeight={theme.fontWeight.bold}>
                                    Badge Image
                                </Typography>
                                <Typography variant="body1" color="gray">
                                    Update your badge image that related to your Badge.
                                </Typography>
                            </Stack>

                            <Stack sx={{ flexDirection: { xs: "row", xss: "column" }, gap: 1 }}>
                                <Button variant="outlined" component="label" startIcon={<Upload />}>
                                    Add Image
                                    <input
                                        type="file"
                                        id="icon-button-photo"
                                        style={{ display: "none" }}
                                        onChange={handleFileChange}
                                    />
                                </Button>
                                <Button variant="outlined" onClick={() => setIsModalOpen(true)} startIcon={<ZoomInMapOutlined />}>
                                    View
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack
                        sx={{
                            backgroundColor: theme.palette.customColors.white,
                            borderRadius: theme.customShape.section,
                            boxShadow: theme.customShadows.default,
                            p: 3,
                            gap: 3,
                            width: "100%",
                        }}
                    >
                        <Stack gap={1}>
                            <Typography variant="h4" fontWeight={theme.fontWeight.bold}>
                                Badge Information
                            </Typography>
                            <Typography variant="body1" color="gray">
                                Update your badge information that related to your Badge.
                            </Typography>
                        </Stack>

                        <EditMetadata control={control} reset={reset} schema={badgeSchema} errors={errors} />

                        <EditCoreElement control={control} reset={reset} schema={badgeSchema} />

                        <EditOptionalElements control={control} reset={reset} schema={badgeSchema} errors={errors} />
                        {/* Submit button */}
                        <Stack alignItems="end" flexDirection="row" justifyContent="end" gap={1}>
                            <Link to={`/dashboard/management/badges/badgeDetail/${userID}`}>
                                <Button
                                    variant="text"
                                    startIcon={<ArrowBack />}
                                    sx={{
                                        borderRadius: theme.customShape.btn,
                                        fontWeight: theme.fontWeight.bold,
                                        px: 2,
                                    }}
                                >
                                    Back
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<SaveAltOutlined />}
                                sx={{
                                    color: theme.palette.customColors.white,
                                    borderRadius: theme.customShape.btn,
                                    fontWeight: theme.fontWeight.bold,
                                    px: 2,
                                    textTransform: 'none'
                                }}
                            >
                                {loading ? <SpinLoading size={24}/> : 'Save'}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </DashboardContainer>
    );
};

export default EditBadge;
