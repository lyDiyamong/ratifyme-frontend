import { useState } from "react";
import { Box, Button, CardMedia, Stack, Typography } from "@mui/material";
import { VerifiedUserRounded } from "@mui/icons-material";

const ImageSwitcher = () => {
    const images = [
        "https://directly-upload-s3-bucket-test.s3.ap-southeast-2.amazonaws.com/Certificate/certificate.png",
        "https://directly-upload-s3-bucket-test.s3.ap-southeast-2.amazonaws.com/Badge/1f6aea4e-b99f-4115-82da-78293b294e9e_BadgeImg.png",
    ];

    const [selectedImage, setSelectedImage] = useState(images[0]);

    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    return (
        <Box sx={{ width: "100%", padding: "20px" }}>
            {/* Main Image Section */}
            <Stack spacing={2} alignItems="center" flexDirection={{ md: "row", xs: "column" }} justifyContent="center">
                <CardMedia
                    component="img"
                    image={selectedImage}
                    alt="Selected Certificate"
                    sx={{
                        width: "100%",
                        maxWidth: 700,
                        height: "100%",
                        maxHeight: 500,
                        borderRadius: "8px",
                        objectFit: "contain",
                        objectPosition: "center",
                        backgroundColor: "#f5f5f5",
                    }}
                />

                {/* Thumbnails Section */}
                <Stack direction={{ md: "column", xss: "row" }} justifyContent="center">
                    {images.map((image, index) => (
                        <Button key={index} onClick={() => handleImageSelect(image)}>
                            <CardMedia
                                component="img"
                                image={image}
                                alt={`Thumbnail ${index}`}
                                sx={{
                                    border: selectedImage === image ? "2px solid #1976d2" : "none",
                                    backgroundColor: "#D5D5D5",
                                    width: "100%",
                                    maxWidth: 100,
                                    height: "100%",
                                    maxHeight: 70,
                                    borderRadius: "8px",
                                    objectFit: "contain",
                                    objectPosition: "center",
                                    padding: "4px",
                                }}
                            />
                        </Button>
                    ))}
                </Stack>
            </Stack>

            <Stack sx={{ maxWidth: 800, mx: "auto", py: "4px", display: { md: "block", xss: "none" } }}>
                <Box display="flex" alignItems="center">
                    <Typography variant="body3" color="textSecondary">
                        Credential ID:{"  "}
                    </Typography>
                    <VerifiedUserRounded sx={{ fontSize: 16, ml: 1, color: "#0AA4A5" }} />
                    <Typography variant="body3" color="#0AA4A5" fontWeight="bold">
                        04786f98-6f2f-4b2b-8c0b-3cf1853c6bba
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
};

export default ImageSwitcher;
