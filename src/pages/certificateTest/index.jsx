import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { Box, Button } from "@mui/material";
import BadgeTest from "../../assets/images/badge.png"
import Certificate from "../../components/Certificate"
import { toPng } from "html-to-image"; // Import html-to-image for conversion

const CertificateGenerator = () => {
    const certificateRef = useRef();
    const [imageDataUrl, setImageDataUrl] = useState(null);

    // const handleGeneratePdf = async () => {

    //     const element = certificateRef.current;
    //     console.log(html2pdf); // Debugging
    //     if (!html2pdf) {
    //         console.error("html2pdf is not loaded properly.");
    //         return;
    //     }

    //     const opt = {
    //         margin: 1,
    //         filename: "myfile.pdf",
    //         image: { type: "jpeg", quality: 0.98 },
    //         html2canvas: { scale: 1 },
    //         jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    //     };
    //     await html2pdf().set(opt).from(element).save();
    // };

    const handleGenerateImage = async () => {
        try {
            // Generate the image from the certificateRef element
            const dataUrl = await toPng(certificateRef.current, {
                quality: 0.95,
            });
            setImageDataUrl(dataUrl); // Save the image data URL in the state
        } catch (error) {
            console.error("Error generating image:", error);
        }
    };

    return (
        <>
            <Box
                ref={certificateRef}
                sx={{ display: "flex", justifyContent: "center" }}
            >
                <Certificate
                    recipientName="John Doe"
                    courseName="React Development"
                    date="2024-04-27"
                    badge={{
                        name: "Open Badge",
                        imageUrl: BadgeTest,
                    }}
                />
            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateImage}
            >
                Download Certificate
            </Button>
            {imageDataUrl && (
                <Box
                    sx={{
                        mt: 4,
                        display: "flex",
                        justifyContent: "center",
                        padding: "20px",
                    }}
                >
                    <Box
                        component="img"
                        src={imageDataUrl}
                        alt="Generated Certificate"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                </Box>
            )}
        </>
    );
};

export default CertificateGenerator;
