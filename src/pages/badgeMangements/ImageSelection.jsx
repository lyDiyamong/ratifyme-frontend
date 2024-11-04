// React import
import { useState, useRef } from "react";

// MUI import
import { Box, Typography, Stack } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

// Custom import
import theme from "../../assets/themes";
import UploadLoading from "../../components/loading/UploadLoading"

const ImageSelection = ({ onImageSelect }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const hiddenFileInput = useRef(null);

    const handleImageChange = (event) => {
        // Start loading
        setLoading(true);
        const file = event.target.files[0];
        const imgname = event.target.files[0].name;
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const maxSize = Math.max(img.width, img.height);
                canvas.width = maxSize;
                canvas.height = maxSize;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, (maxSize - img.width) / 2, (maxSize - img.height) / 2);

                canvas.toBlob(
                    (blob) => {
                        const file = new File([blob], imgname, {
                            type: "image/png",
                            lastModified: Date.now(),
                        });

                        setImage(file);
                        onImageSelect(file);

                        // SetTimeout to see Loading
                        setTimeout(() => {
                            const file = event.target.files[0];
                            setImage(file);
                            setLoading(false);
                        }, 4000);
                    },
                    "image/jpeg",
                    0.8,
                );
            };
        };
    };

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    return (
        // ============ Start Image Selection component ============
        <Stack
            direction="row"
            flexDirection={{ xss: "column-reverse", md: "row" }}
            sx={{ gap: 4, alignItems: "center" }}
        >
            {/* Start the image selection section */}
            <Box
                onClick={handleClick}
                border={`2px dashed ${theme.palette.cardBorder}`}
                borderRadius={theme.customShape.input}
                padding={1}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                position="relative"
                sx={{
                    cursor: "pointer",
                }}
            >
                {/* Uploading Loading */}
                {loading ? (
                    <UploadLoading />
                ) : (
                    <>
                        {image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Uploaded badge"
                                style={{
                                    width: "100%",
                                    maxWidth: "300px",
                                    borderRadius: theme.customShape.input,
                                    height: "auto",
                                }}
                            />
                        ) : (
                            <CloudDownloadIcon style={{ fontSize: 40, color: theme.palette.text.secondary }} />
                        )}
                        <input
                            id="image-upload-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={hiddenFileInput}
                            style={{ display: "none" }}
                        />
                    </>
                )}
            </Box>
            {/* End the image selection section */}

            {/* Start Image info */}
            <Stack>
                <Typography
                    variant="h6"
                    sx={{ color: theme.palette.text.primary, fontWeight: theme.fontWeight.semiBold }}
                >
                    Upload Badge Image
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    {image ? "Change your image" : "Choose an image"}
                </Typography>
            </Stack>
            {/* End Image info */}
        </Stack>
        // ============ End Image Selection component ============
    );
};

export default ImageSelection;
