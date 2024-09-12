import { useState, useRef } from "react";

import { Box, Typography, Stack, CircularProgress } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import theme from "../../assets/themes";

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
                        // setLoading(false); // Stop loading

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
        <Stack
            direction="row"
            flexDirection={{ xss: "column-reverse", md: "row" }}
            sx={{ gap: 4, alignItems: "center" }}
        >
            <Box
                border={`2px dashed ${theme.palette.cardBorder}`}
                borderRadius={theme.customShape.input}
                padding={1}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                position="relative"
            >
                {loading ? (
                    <CircularProgress />
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
                            <CloudDownloadIcon
                                onClick={handleClick}
                                style={{ fontSize: 40, color: theme.palette.text.secondary }}
                            />
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
        </Stack>
    );
};

export default ImageSelection;
