// React import
import { useEffect, useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import { useSelector } from "react-redux";

// MUI import
import { Box, Button, CardMedia, Stack, Typography } from "@mui/material";
import DriveFolderUploadOutlined from "@mui/icons-material/DriveFolderUploadOutlined";
import DownloadDoneOutlined from "@mui/icons-material/DownloadDoneOutlined";

// Custom import
import Certificate from "../../../components/Certificate";
import useCatchStatus from "../../../hooks/useCatchStatus";
import AlertMessage from "../../../components/alert/AlertMessage";
import theme from "../../../assets/themes";
import ComingSoonImg from "../../../assets/images/Coming-soon.svg";
import PageLoading from "../../../components/loading/PageLoading";

// Api import
import { useUploadCertiMutation } from "../../../store/api/badgeManagement/badgeApi";
import { useFetchEarnerAchieByIdQuery } from "../../../store/api/earnerManagement/earnerApis";
import AlertConfirmation from "../../../components/alert/AlertConfirmation";
import { WarningAmberOutlined } from "@mui/icons-material";

const CertificateGenerator = ({ badge }) => {
    // Global state hook
    const {
        userInfo,
        earnerData: { id: earnerId },
    } = useSelector((state) => state.global);

    // Get reference of HTMLELEMENT
    const certificateRef = useRef();
    // Achievement Id
    const achieveId = badge?.Achievements?.find(({ badgeClassId }) => badgeClassId === badge.id)?.id;

    // Fetch Earner achievement hook
    const { data: earnerAchieResponse } = useFetchEarnerAchieByIdQuery({ achieveId, earnerId });
    const earnerAchieveData = earnerAchieResponse?.data;
    const earnerAchieveStatus = earnerAchieResponse?.data?.status;
    const certUrl = earnerAchieResponse?.data?.certUrlPdf;

    // Upload Certificate hook
    const [uploadCert, { isLoading: certiLoading, isError: uploadCertError }] = useUploadCertiMutation();

    // Catch status hook
    const [message, setMessage] = useCatchStatus(uploadCertError, "Get certificate failed");

    const [isCertUpload, setIsCertUpload] = useState(false);
    const [isUploadCertModal, setIsUploadCertModal] = useState(false);

    const handleGenerateImage = async () => {
        let jpegDataUrl, blob, formData;

        try {
            // Generate JPEG data URL
            jpegDataUrl = await toJpeg(certificateRef.current, { quality: 0.95 });

            // Fetch blob from data URL
            blob = await fetch(jpegDataUrl).then((res) => res.blob());

            // Create FormData and append the blob
            formData = new FormData();
            formData.append("certFile", blob, `${earnerAchieResponse?.data?.credId}`);

            // Upload certificate
            const response = await uploadCert({ achieveId, earnerId, uploadedCert: formData }).unwrap();

            // Open the uploaded certificate URL
            if (response) {
                window.open(response?.uploadCert, "_blank");
                if (response?.uploadCert) {
                    setIsCertUpload(true);
                }
            }
        } catch (error) {
            // Handle errors
            setMessage("Failed to upload certificate.");
        } finally {
            // Close modal regardless of success or error
            setIsUploadCertModal(false);
        }
    };

    // View handling
    const handleViewCert = () => {
        window.open(earnerAchieResponse?.data?.certUrlPdf, "_blank");
    };

    // Disable Generate button effect
    useEffect(() => {
        if (certUrl) {
            setIsCertUpload(true);
        }
    }, [certUrl]);

    return (
        <Box>
            <PageLoading isLoading={certiLoading} />
            {message && (
                <AlertMessage variant="error" onClose={() => setMessage("")}>
                    {message}
                </AlertMessage>
            )}
            {!earnerAchieveStatus ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{
                        bgcolor: "white",
                        borderRadius: theme.customShape.section,
                        boxShadow: theme.customShadows.default,
                        gap: 3,
                        padding: 3,
                        my: 3,
                    }}
                >
                    {/* Heading Section */}
                    <Typography variant="h3" fontWeight="bold" textAlign="center" color={theme.palette.primary.main}>
                        Certificate Pending
                    </Typography>

                    <Typography variant="subtitle1" textAlign="center" color={theme.palette.text.secondary} sx={{ mb: 3 }}>
                        You’re one step closer to earning your certificate!
                    </Typography>
                    {/* Image Section */}
                    <CardMedia
                        component="img"
                        image={ComingSoonImg}
                        alt="No badges found"
                        sx={{ maxWidth: 400, width: "100%" }}
                    />
                    <Box
                        sx={{
                            maxWidth: 600,
                            width: "100%",
                        }}
                    >
                        <Typography variant="body1" mt={2} textAlign="center" color={theme.palette.text.secondary}>
                            Earn your badge first. Once you meet the criteria, you'll be able to claim and download your
                            certificate!
                        </Typography>
                    </Box>
                </Box>
            ) : (
                <Stack
                    sx={{
                        bgcolor: "white",
                        borderRadius: theme.customShape.section,
                        boxShadow: theme.customShadows.default,
                        gap: 3,
                        padding: 3,
                        background: `linear-gradient(to bottom, ${theme.palette.action.hover} 40%, ${theme.palette.customColors.white} 30%)`,
                    }}
                >
                    <Stack sx={{ justifyContent: "center", alignItems: { md: "center", xss: "start" }, gap: 1 }}>
                        <Typography variant="h2" sx={{ fontWeight: theme.fontWeight.bold }}>
                            Here is your certificate!🎉
                        </Typography>
                        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                            You've worked hard, and it's paid off—congratulations on earning your certificate!
                        </Typography>
                    </Stack>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                overflowX: "scroll",
                                whiteSpace: "nowrap",
                                "::-webkit-scrollbar": {
                                    display: "none",
                                },
                                scrollbarWidth: "none",
                                border: `1px solid ${theme.palette.cardBorder}`,
                                width: "100%",
                                maxWidth: 1000,
                                // Set maxWidth to 900px when between 1200px and 1383px
                                "@media (min-width: 1200px) and (max-width: 1383px)": {
                                    maxWidth: "820px",
                                },
                            }}
                        >
                            {/* Start Certificate */}
                            <Certificate
                                ref={certificateRef}
                                recipientName={`${userInfo?.firstName} ${userInfo?.lastName}`}
                                badge={badge}
                                earnerAchieve={earnerAchieveData}
                            />
                            {/* End Certificate */}
                        </Box>
                    </Box>

                    <Stack
                        sx={{
                            flexDirection: "row",
                            gap: 2,
                            justifyContent: "end",
                            alignItems: "start",
                            maxWidth: 1000,
                            width: "100%",
                            mx: "auto",
                        }}
                    >
                        <Stack flexDirection={{ md: "row", xss: "column" }} gap={1}>
                            {/* Start Upload  */}
                            <AlertConfirmation
                                open={isUploadCertModal}
                                title="Upload Certificate"
                                message="Are you sure everything looks good? Once your certificate is uploaded, your name and details will be locked. You won't be able to make changes later, so please double-check your information!"
                                onClose={() => setIsUploadCertModal(false)}
                                onConfirm={handleGenerateImage}
                                confirmText="Upload"
                                cancelText="Cancel"
                                iconBgColor={theme.palette.customColors.orange100}
                                iconColor={theme.palette.customColors.orange300}
                                confirmButtonColor={theme.palette.primary.main}
                                confirmButtonColorHover={theme.palette.primary.dark}
                                icon={WarningAmberOutlined}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setIsUploadCertModal(true)}
                                sx={{ maxWidth: 200, color: theme.palette.customColors.white }}
                                startIcon={<DownloadDoneOutlined />}
                                disabled={isCertUpload}
                            >
                                Get Certificate
                            </Button>
                            <Button startIcon={<DriveFolderUploadOutlined />} variant="outlined" onClick={handleViewCert}>
                                View Certificate
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            )}
        </Box>
    );
};

export default CertificateGenerator;
