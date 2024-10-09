import { useRef, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { toJpeg } from "html-to-image";
import axios from "axios";
import BadgeTest from "../../assets/images/badge.png";
import Certificate from "../../components/Certificate";
import DashboardContainer from "../../components/styles/DashboardContainer";
import theme from "../../assets/themes";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ConfettiExplosion from "react-confetti-explosion";
import DownloadDoneOutlined from "@mui/icons-material/DownloadDoneOutlined";
import AutoAwesome from "@mui/icons-material/AutoAwesome";
import { useSelector } from "react-redux";
import { useFetchOneBadgeQuery } from "../../store/api/badgeManagement/badgeApi";

const CertificateGenerator = () => {
    // Global state hook
    const {
        userInfo,
    } = useSelector((state) => state.global);

    // Badge fetching hook
    const {data: badgeResponse, isLoading} = useFetchOneBadgeQuery(4)
    const badgeData = badgeResponse?.data
    console.log(badgeResponse);

    const certificateRef = useRef();
    const [pdfUrl, setPdfUrl] = useState("");
    const [copyButtonText, setCopyButtonText] = useState("Copy URL");
    const [isExploding, setIsExploding] = useState(false);

    const handleGenerateImage = async () => {
        try {
            const svgDataUrl = await toJpeg(certificateRef.current, { quality: 0.95 });
            const blob = await fetch(svgDataUrl).then((res) => res.blob());
            const formData = new FormData();
            formData.append("certFile", blob, `certificate-${userInfo?.username}`);

            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/earners/uploadCerti`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log(response);

            if (response.data.pdfUrl) {
                setPdfUrl(response.data.pdfUrl);
                window.open(response.data.pdfUrl, "_blank");
            } else {
                console.error("PDF URL not found in the response.");
            }
        } catch (error) {
            console.error("Error generating and uploading PDF:", error);
        }
    };

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
                .catch((err) => {
                    console.error("Failed to copy: ", err);
                });
        } else {
            console.error("No URL available to copy.");
        }
    };

    const handleCongrats = () => {
        setIsExploding(true);
        setTimeout(() => setIsExploding(false), 4000);
    };

    return (
        <DashboardContainer>
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
                            badge={badgeData}
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
        </DashboardContainer>
    );
};

export default CertificateGenerator;
