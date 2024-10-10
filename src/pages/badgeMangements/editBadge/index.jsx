import { useEffect, useState } from "react";
import { Box, Tabs, Tab, Button, Stack, Typography, IconButton, Divider } from "@mui/material";
import EditCoreElement from "./EditCoreElement";
import EditMetadata from "./EditMetadata";
import EditOptionalElements from "./EditOptionalElements";
import PageTitle from "../../../components/PageTitle";
import DashboardContainer from "../../../components/styles/DashboardContainer";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useFetchAchievementTypeQuery } from "../../../store/api/achievements/achievementTypeApi";
import { useFetchOneBadgeQuery, useUpdateBadgeMutation } from "../../../store/api/badgeManagement/badgeApi";
import theme from "../../../assets/themes";
import dayjs from "dayjs";
import { ArrowBack, CameraAltRounded } from "@mui/icons-material";
import Upload from "@mui/icons-material/Upload";
import SaveAltOutlined from "@mui/icons-material/SaveAltOutlined";
import { Link } from "react-router-dom";

const EditBadge = () => {
    const { id: badgeId } = useParams();
    const { data: badgeResponse } = useFetchOneBadgeQuery(badgeId);
    const badgeData = badgeResponse?.data;
    const userID = badgeData?.id;

    const [updateBadge, { reset: updatedReset }] = useUpdateBadgeMutation();

    const { data: achievementType } = useFetchAchievementTypeQuery();
    const allAchievementTypes = achievementType?.data || [];

    const [displayImg, setDisplayImg] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);

    const { handleSubmit, control, reset } = useForm();

    // Debugging the parsed date
    const parsedExpirationDate = dayjs(badgeData?.expiredDate);

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

        try {
            await updateBadge({ id: badgeId, updatedBadge: formData }).unwrap();
            reset();
        } catch (error) {
            console.error("Error updating badge:", error);
        } finally {
            updatedReset();
        }
    };

    // Helper function to append badge details to FormData
    const appendBadgeDetails = (formData, data) => {
        formData.append("name", data.badgeName);
        formData.append("description", data.badgeDescription);
        formData.append("tags", data.tagsOrLanguage.join(", "));
        formData.append("startedDate", dayjs(data.startedDate) || null);
        formData.append("issuerId", badgeData?.Issuer.id);
        formData.append("expiredDate", data.expiredDate);
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
            const achievementNames =
                badgeData?.Achievements?.map((achievement) => achievement.AchievementType.name) || [];

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
                expiredDate: parsedExpirationDate || null,
            });

            // Set the uploaded image URL if available
            setDisplayImg(badgeData?.imageUrl || null);
        }
    }, [badgeData, displayImg]);

    // Handle file input change
    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setUploadedImage(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedImage(file);
        }
    };

    return (
        <DashboardContainer>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} py={3}>
                <PageTitle
                    title="Edit Badge"
                    subtitle="Update the details to ensure it accurately represents your achievement."
                />

                <Stack
                    sx={{
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
                        <Stack gap={1} display={{ md: "block", xss: "none" }}>
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
                                    src={
                                        displayImg || "https://www.mylittleadventure.com/images/default/default-img.png"
                                    }
                                    alt="Badge"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: theme.customShape.input,
                                        objectFit: "cover",
                                        display: "block",
                                        border: "1px solid gray",
                                    }}
                                />

                                <Box
                                    className="hover-overlay"
                                    onChange
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: theme.customShape.input,
                                        bgcolor: "rgba(0, 0, 0, 0.6)",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        visibility: "hidden",
                                        opacity: 0,
                                        transition: "visibility 0.2s, opacity 0.3s ease-in-out",
                                        cursor: "pointer",
                                    }}
                                >
                                    <input
                                        type="file"
                                        id="icon-button-photo"
                                        style={{ display: "none" }}
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="icon-button-photo">
                                        <IconButton
                                            aria-label="upload"
                                            component="span"
                                            sx={{
                                                color: theme.palette.customColors.white,
                                            }}
                                        >
                                            <CameraAltRounded />
                                        </IconButton>
                                    </label>
                                    <Typography variant="body3" color={theme.palette.customColors.white}>
                                        Update Profile
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>

                        <Stack gap={1}>
                            <Stack gap={1} display={{ md: "none", xss: "block" }}>
                                <Typography variant="h4" fontWeight={theme.fontWeight.bold}>
                                    Badge Image
                                </Typography>
                                <Typography variant="body1" color="gray">
                                    Update your badge image that related to your Badge.
                                </Typography>
                            </Stack>
                            <Button variant="outlined" component="label" startIcon={<Upload />}>
                                Add Image
                                <input
                                    type="file"
                                    id="icon-button-photo"
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                            </Button>
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
                        <EditCoreElement control={control} badgeData={badgeData} reset={reset} />

                        <EditMetadata control={control} badgeData={badgeData} reset={reset} />

                        <EditOptionalElements control={control} badgeData={badgeData} reset={reset} />
                        {/* Submit button */}
                        <Stack alignItems="end" flexDirection="row" justifyContent="end" gap={1}>
                            <Link to={`/management/badges/badgeDetail/${userID}`}>
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
                                }}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </DashboardContainer>
    );
};

export default EditBadge;
