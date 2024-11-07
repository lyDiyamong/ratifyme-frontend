// React import
import { useEffect, useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import { useSelector } from "react-redux";

// MUI import
import { Box, Button, CardMedia, Stack, Typography } from "@mui/material";
import DriveFolderUploadOutlined from "@mui/icons-material/DriveFolderUploadOutlined";
import DownloadDoneOutlined from "@mui/icons-material/DownloadDoneOutlined";
import { WarningAmberOutlined } from "@mui/icons-material";

// Custom import
import Certificate from "../../../components/Certificate";
import AlertMessage from "../../../components/alert/AlertMessage";
import PageLoading from "../../../components/loading/PageLoading";
import AlertConfirmation from "../../../components/alert/AlertConfirmation";
import useCatchStatus from "../../../hooks/useCatchStatus";
import ComingSoonImg from "../../../assets/images/Coming-soon.svg";
import theme from "../../../assets/themes";

// Api import
import { useUploadCertiMutation } from "../../../store/api/badgeManagement/badgeApi";
import { useFetchEarnerAchieByIdQuery } from "../../../store/api/earnerManagement/earnerApis";

// Convert remote images to base64 with SVG support
const convertImageToBase64 = async (imgUrl) => {
    try {
        const response = await fetch(imgUrl);
        const contentType = response.headers.get("Content-Type");

        // Check if the image is SVG
        if (contentType && contentType.includes("svg")) {
            const svgText = await response.text();
            // Encode SVG text as base64
            const base64 = btoa(unescape(encodeURIComponent(svgText)));
            return `data:image/svg+xml;base64,${base64}`;
        } else {
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        }
    } catch (error) {
        console.error("Error converting image:", error);
        return null;
    }
};

// Function to prepare and load images in base64
const prepareImages = async (certificateRef) => {
    const images = certificateRef.current.getElementsByTagName("img");
    await Promise.all(
        Array.from(images).map(async (img) => {
            try {
                if (!img.src.startsWith("data:image")) {
                    const base64 = await convertImageToBase64(img.src);
                    if (base64) {
                        img.src = base64;
                        await new Promise((resolve, reject) => {
                            img.onload = resolve;
                            img.onerror = reject;
                        });
                    }
                }
            } catch (error) {
                console.error("Error preparing image:", error);
            }
        }),
    );
};

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
    const [uploadCert, { isLoading: certiLoading, isError: uploadCertError, data: certUploadRes }] = useUploadCertiMutation();
    console.log(certUploadRes);
    // Catch status hook
    const [message, setMessage] = useCatchStatus(uploadCertError, "Get certificate failed");

    const [isCertUpload, setIsCertUpload] = useState(false);
    const [isUploadCertModal, setIsUploadCertModal] = useState(false);
    const [viewBtn, setViewBtn] = useState(false);

    // Generate certificate image and upload it
    const handleGenerateImage = async () => {
        try {
            // Wait for DOM readiness
            await new Promise((resolve) => setTimeout(resolve, 100));
            // Wait for fonts to load
            await document.fonts.ready;
            // Preload and convert images
            await prepareImages(certificateRef);

            const imageSettings = {
                quality: 1.0,
                pixelRatio: 2,
                cacheBust: true,
                skipFonts: false,
                backgroundColor: "#ffffff",
                style: { transform: "scale(1)", transformOrigin: "top left" },
                fetchRequestInit: { mode: "cors", credentials: "same-origin" },
            };

            const jpegDataUrl = await toJpeg(certificateRef.current, imageSettings);
            const blob = await fetch(jpegDataUrl)
                .then((res) => res.blob())
                .then((b) => new Blob([b], { type: "image/jpeg" }));

            const formData = new FormData();
            formData.append("certFile", blob, `${earnerAchieResponse?.data?.credId}.jpg`);

            const response = await uploadCert({
                achieveId,
                earnerId,
                uploadedCert: formData,
            }).unwrap();

            if (response?.uploadCert) {
                window.open(response.uploadCert, "_blank");
                setIsCertUpload(true);
                setViewBtn(true);
            }
        } catch (error) {
            setMessage("Failed to generate certificate. Please try again.");
        } finally {
            setIsUploadCertModal(false);
        }
    };

    // View handling
    const handleViewCert = () => {
        window.open(certUploadRes.uploadCert, "_blank");
    };

    // Disable Generate button effect
    useEffect(() => {
        if (certUrl) {
            setIsCertUpload(true);
        }
    }, [earnerAchieResponse, certUrl]);

    // Use in your component
    useEffect(() => {
        const preloadImages = async () => {
            const images = certificateRef.current.getElementsByTagName("img");
            for (let img of images) {
                const base64 = await convertImageToBase64(img.src);
                if (base64) {
                    img.src = base64;
                }
            }
        };
        preloadImages();
    }, []);

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
                                sx={{ maxWidth: 200, color: theme.palette.customColors.white, textTransform: "none" }}
                                startIcon={<DownloadDoneOutlined />}
                                disabled={isCertUpload}
                            >
                                Get Certificate
                            </Button>
                            <Button
                                disabled={earnerAchieResponse?.data?.certUrlPdf || viewBtn ? false : true}
                                startIcon={<DriveFolderUploadOutlined />}
                                variant="outlined"
                                onClick={handleViewCert}
                                sx={{ textTransform: "none" }}
                            >
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
