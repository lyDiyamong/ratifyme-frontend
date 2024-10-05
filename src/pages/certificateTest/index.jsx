import { Box } from "@mui/system";
import Certificate from "../../components/Certificate";
import { useRef } from "react";
import html2pdf from "html2pdf"
import { Button } from "@mui/material";

import BadgeTest from "../../assets/images/badge.png"

const CertificateTesting = () => {
    const certificateRef = useRef();

    const handleGeneratePdf = () => {
        const element = certificateRef.current;
        const opt = {
            margin: 1,
            filename: "myfile.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 1 },
            jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
        };
        html2pdf().set(opt).from(element).save();
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
                onClick={handleGeneratePdf}
            >
                Download Certificate
            </Button>
        </>
    );
};

export default CertificateTesting;
