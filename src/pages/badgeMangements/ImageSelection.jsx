// React import
import { useState, useRef } from "react";

// MUI import
import { Box, Typography, IconButton, Stack } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

// Custom import
import theme from "../../assets/themes";

const ImageSelection = ({ onImageSelect }) => {
    const [image, setImage] = useState(null);
    const hiddenFileInput = useRef(null);

    // This function handles the image upload when the file is selected.
    const handleImageChange = (event) => {
        // Fetches the first selected file.
        const file = event.target.files[0];
        // Stores the name of the selected file.
        const imgname = event.target.files[0].name;
        // FileReader is used to read the selected image file as a data URL.
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                // Creates a canvas element to allow image manipulation.
                const canvas = document.createElement("canvas");
                const maxSize = Math.max(img.width, img.height);
                canvas.width = maxSize;
                canvas.height = maxSize;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, (maxSize - img.width) / 2, (maxSize - img.height) / 2);

                // This Converts the canvas content into a Blob (binary large object) with image data.
                canvas.toBlob(
                    (blob) => {
                        const file = new File([blob], imgname, {
                            type: "image/png",
                            lastModified: Date.now(),
                        });

                        // This Store the image file locally, but don't log it
                        setImage(file);
                        // This Pass the file to parent form
                        onImageSelect(file);
                    },
                    //output format of the image JPEG
                    "image/jpeg",
                    0.8,
                );
            };
        };
    };

    // This function triggers the hidden file input.
    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    return (
        // ============ Start the image selection form ============
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
                {/* Start image section */}
                <img
                    src={
                        image
                            // If image is selected, it generates a URL for preview.
                            ? URL.createObjectURL(image)
                            : "https://www.freeiconspng.com/thumbs/photography-icon-png/photo-album-icon-png-14.png"
                    }
                    // This Changes the alt text depending on whether image is selected.
                    alt={image ? "upload badge image" : "Upload placeholder"}
                    style={{
                        width: "100%",
                        maxWidth: "300px",
                        borderRadius: theme.customShape.input,
                        height: "auto",
                    }}
                />
                {/* End image section */}

                {/* Start the select section */}
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
                        MozBorderRadiusBottomright: theme.customShape.input,
                        borderBottomLeftRadius: theme.customShape.input,
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
                {/* End the select section */}
            </Box>

            {/* Start the details info */}
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
                    Badge templates must use square images in PNG format, with dimensions between 300x300.
                </Typography>
            </Stack>
            {/* End the details info */}
        </Stack>
        // ============ Start the image selection form ============
    );
};

export default ImageSelection;
