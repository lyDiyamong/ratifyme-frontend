import { useState, useRef } from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import theme from "../../assets/themes";

function ImageSelection() {
    const [image, setImage] = useState(null);
    const hiddenFileInput = useRef(null);

    const handleImageChange = (event) => {
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

                        console.log(file);
                        setImage(file);
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
            flexDirection={{ xs: "column-reverse", md: "row" }}
            sx={{ gap: 4, alignItems: "center" }}
        >
            <Box
                border={`2px dashed ${theme.palette.cardBorder}`}
                borderRadius="5px"
                padding="30px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                position="relative"
            >
                <img
                    src={
                        image
                            ? URL.createObjectURL(image)
                            : "https://i.pinimg.com/originals/d3/24/2f/d3242f666654a5bc596ace902db5d602.png"
                    }
                    alt={image ? "upload badge image" : "Upload placeholder"}
                    style={{
                        width: "100%",
                        maxWidth: "300px",
                        borderRadius: theme.customShape.input,
                        height: "auto",
                    }}
                />
                <Box
                    onClick={handleClick}
                    sx={{
                        position: "absolute",
                        top: "90%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "20%",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        zIndex: 2,
                    }}
                >
                    <IconButton sx={{ color: "white" }}>
                        <CameraAltIcon />
                    </IconButton>
                </Box>
                <input
                    id="image-upload-input"
                    type="file"
                    onChange={handleImageChange}
                    ref={hiddenFileInput}
                    style={{ display: "none" }}
                />
            </Box>
            <Stack gap={2}>
                <Typography component="h3" variant="h3" fontWeight={theme.fontWeight.semiBold}>
                    Add an image
                </Typography>
                <Typography
                    variant="body1`"
                    sx={{
                        maxWidth: "300px",
                        width: "100%",
                        color: theme.palette.text.disabled,
                    }}
                >
                    Badge templates must use square images in PNG format, with dimensions between 300x300 and 2048x2048
                    pixels.
                </Typography>
            </Stack>
        </Stack>
    );
}

export default ImageSelection;
