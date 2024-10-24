import { useState, useEffect } from "react";
import { Box, Button, CardMedia, Skeleton, Stack, Typography } from "@mui/material";
import { VerifiedUserRounded } from "@mui/icons-material";
import DefaultAchivementImage from "../../../assets/icons/DefaultAchivementImage.svg";

const ImageSwitcher = ({ images = [], credId }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulate loading state for the images
    useEffect(() => {
        if (images.length > 0) {
            setSelectedImage(images[0]);
            setLoading(false);
        }
    }, [images]);

    // Delay the display of content for at least 3 seconds
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         if (images.length > 0) {
    //             setSelectedImage(images[0]);
    //             setLoading(false);
    //         }
    //     }, 1000);

    //     // Clear timeout if component unmounts
    //     return () => clearTimeout(timeout);
    // }, [images]);

    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    return (
        <Box sx={{ width: "100%", padding: "20px" }}>
            {/* Main Image Section */}
            <Stack spacing={2} alignItems="center" flexDirection={{ md: "row", xs: "column" }} justifyContent="center">
                {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={500} sx={{ borderRadius: "8px", maxWidth: 700 }} />
                ) : (
                    <CardMedia
                        component="img"
                        image={selectedImage || DefaultAchivementImage}
                        alt="Selected Certificate"
                        sx={{
                            width: "100%",
                            maxWidth: 700,
                            height: "100%",
                            maxHeight: 500,
                            borderRadius: "8px",
                            objectFit: "contain",
                            objectPosition: "center",
                            backgroundColor: "#E6E8EC",
                        }}
                    />
                )}

                {/* Thumbnails Section */}
                <Stack direction={{ md: "column", xss: "row" }} justifyContent="center">
                    {loading
                        ? Array.from(new Array(3)).map((_, index) => (
                              <Skeleton
                                  key={index}
                                  variant="rectangular"
                                  width={100}
                                  height={70}
                                  sx={{ borderRadius: "8px", margin: "4px" }}
                              />
                          ))
                        : images.map((image, index) => (
                              <Button key={index} onClick={() => handleImageSelect(image)}>
                                  <CardMedia
                                      component="img"
                                      image={image || DefaultAchivementImage}
                                      alt={`Thumbnail ${index}`}
                                      sx={{
                                          border: selectedImage === image ? "2px solid #1976d2" : "none",
                                          backgroundColor: "#E6E8EC",
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
                        {credId}
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
};

export default ImageSwitcher;
