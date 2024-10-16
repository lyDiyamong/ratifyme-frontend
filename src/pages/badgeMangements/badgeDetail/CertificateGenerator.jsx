// React import
import { useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import { useSelector } from "react-redux";

// MUI import
import { Box, Button, CardMedia, Stack, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ConfettiExplosion from "react-confetti-explosion";
import DownloadDoneOutlined from "@mui/icons-material/DownloadDoneOutlined";
import AutoAwesome from "@mui/icons-material/AutoAwesome";

// Custom import
import Certificate from "../../../components/Certificate";
import DashboardContainer from "../../../components/styles/DashboardContainer";
import useCatchStatus from "../../../hooks/useCatchStatus";
import AlertMessage from "../../../components/alert/AlertMessage";
import theme from "../../../assets/themes";
import ComingSoonImg from "../../../assets/images/Coming-soon.svg";

// Api import
import { useUploadCertiMutation } from "../../../store/api/badgeManagement/badgeApi";
import { useFetchEarnerAchieByIdQuery } from "../../../store/api/earnerManagement/earnerApis";

const CertificateGenerator = ({ badge }) => {
    // Global state hook
    const {
        userInfo,
        earnerData: { id: earnerId },
    } = useSelector((state) => state.global);
    // Get reference of HTMLELEMENT
    const certificateRef = useRef();
    // Achivement Id
    const achieveId = badge.Achievements.find(({ badgeClassId }) => badgeClassId === badge.id).id;

    // Fetch Earner achievement hook
    const { data: earnerAchieResponse } = useFetchEarnerAchieByIdQuery({ achieveId, earnerId });
    console.log("Earner achievement res", earnerAchieResponse);
    const earnerAchieveStatus = earnerAchieResponse?.data?.status;

    // Upload Certificate hook
    const [uploadCert, { isLoading: certiLoading, isError: uploadCertError }] = useUploadCertiMutation();

    // Catch status hook
    const [message, setMessage] = useCatchStatus(uploadCertError, "Get certificate failed");

    const [pdfUrl, setPdfUrl] = useState("");
    const [copyButtonText, setCopyButtonText] = useState("Copy URL");
    const [isExploding, setIsExploding] = useState(false);

    const handleGenerateImage = async () => {
        const jpegDataUrl = await toJpeg(certificateRef.current, { quality: 0.95 });
        const blob = await fetch(jpegDataUrl).then((res) => res.blob());
        const formData = new FormData();
        formData.append("certFile", blob, `certificate-${userInfo?.username}`);

        // Handle errors using useCatchStatus instead of try-catch
        await uploadCert({ uploadedCert: formData })
            .unwrap() // Access the success response
            .then((response) => {
                if (response) {
                    setPdfUrl(response.pdfUrl);
                    window.open(response.pdfUrl, "_blank");
                }
            })
            .catch((error) => setMessage("Failed to upload certificate."));
    };

    // Copy handling
    const handleCopyUrl = () => {
        if (pdfUrl) {
            navigator.clipboard
                .writeText(pdfUrl)
                .then(() => {
                    setCopyButtonText("Copied!");
                    setTimeout(() => {
                        setCopyButtonText("Copy URL");
                    }, 3000);
                })
                .catch(() => setMessage("Failed to copy URL."));
        } else {
            setMessage("No URL available to copy.");
        }
    };

    // Congrat handling
    const handleCongrats = () => {
        setIsExploding(true);
        setTimeout(() => setIsExploding(false), 4000);
    };

    return (
        <DashboardContainer>
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

                    <Typography
                        variant="subtitle1"
                        textAlign="center"
                        color={theme.palette.text.secondary}
                        sx={{ mb: 3 }}
                    >
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
                        my: 3,
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
                            }}
                        >
                            {/* Start Certificate */}
                            <Certificate
                                ref={certificateRef}
                                recipientName={`${userInfo?.firstName} ${userInfo?.lastName}`}
                                date="2024-04-27"
                                badge={badge}
                            />
                            {/* End Certificate */}
                        </Box>
                    </Box>

                    <Stack
                        sx={{
                            flexDirection: "row",
                            gap: 2,
                            justifyContent: "space-between",
                            alignItems: "start",
                            maxWidth: 1000,
                            width: "100%",
                            mx: "auto",
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="success"
                            sx={{
                                maxWidth: 200,
                                backgroundColor: theme.palette.customColors.green100,
                                "&:hover": {
                                    backgroundColor: theme.palette.background.success,
                                },
                            }}
                            onClick={handleCongrats}
                        >
                            <AutoAwesome />
                        </Button>
                        <Stack flexDirection={{ md: "row", xss: "column" }} gap={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleGenerateImage}
                                sx={{ maxWidth: 200, color: theme.palette.customColors.white }}
                                startIcon={<DownloadDoneOutlined />}
                            >
                                Get Certificate
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ maxWidth: 200 }}
                                onClick={handleCopyUrl}
                                startIcon={<ContentCopyIcon />}
                            >
                                {copyButtonText}
                            </Button>
                        </Stack>
                    </Stack>
                    {isExploding && (
                        <Box sx={{ position: "absolute", top: "20%", left: { md: "55%", xss: "50%" } }}>
                            <ConfettiExplosion force={0.6} duration={3000} particleCount={150} width={1600} />
                        </Box>
                    )}
                </Stack>
            )}
        </DashboardContainer>
    );
};

export default CertificateGenerator;
