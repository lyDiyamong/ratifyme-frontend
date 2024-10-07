import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router";
import { Box, Button } from "@mui/material";
import BadgeTest from "../../assets/images/badge.png";
import Certificate from "../../components/Certificate";
import { toJpeg } from "html-to-image"; // Import html-to-image for conversion
import axios from "axios";

const CertificateGenerator = () => {
    const certificateRef = useRef();
    const [imageDataUrl, setImageDataUrl] = useState(null);

    const handleGenerateImage = async () => {
        try {
            // Generate the image from the certificateRef element
            const svgDataUrl = await toJpeg(certificateRef.current, {
                quality: 0.95,
            });
            setImageDataUrl(svgDataUrl); // Save the image data URL in the state
            // Convert the SVG Data URL to a Blob
            const blob = await fetch(svgDataUrl).then((res) => res.blob());

            // Create a FormData object to send the file to the server
            const formData = new FormData();
            formData.append("certFile", blob, "certificate");

            // Send the file to the backend using Axios
            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/earners/uploadCerti`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.pdfUrl) {
                // Get the path without the origin part of the URL

                // Open the PDF in a new tab
                window.open(response.data.pdfUrl, "_blank");
            }
        } catch (error) {
            console.error("Error generating and uploading PDF:", error);
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Certificate
                    ref={certificateRef}
                    recipientName="Sreang Lyhour"
                    date="2024-04-27"
                    badge={{
                        name: "Advance Frontend",
                        imageUrl: BadgeTest,
                    }}
                />
            </Box>
            <Button variant="contained" color="primary" onClick={handleGenerateImage}>
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
