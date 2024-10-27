// React library import
import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import LandingContainer from "../../components/styles/LandingContainer";

const OurCustomers = () => {
    const images = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
        "https://ratifyme.s3.ap-southeast-2.amazonaws.com/Logo/emcast-logo.png",
        "https://ratifyme.s3.ap-southeast-2.amazonaws.com/Logo/AboveBeyond.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png",
        "https://ratifyme.s3.ap-southeast-2.amazonaws.com/Logo/RatfiyME.png",
    ];

    const duplicatedImages = [...images, ...images];

    return (
        <LandingContainer>
            <Box sx={{ textAlign: "center", padding: "40px 0" }}>
                <Typography variant="h3" sx={{ marginBottom: "50px" }}>
                    Trusted by more than <span style={{ fontWeight: "bold", color: "#000" }}>100,000</span> of the world's leading
                    organizations
                </Typography>
                <Stack
                    component={motion.div}
                    direction="row"
                    sx={{
                        mx: "auto",
                        overflow: "hidden",
                        width: "100%",
                    }}
                >
                    <Stack
                        component={motion.div}
                        direction="row"
                        initial={{ x: 0 }}
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            duration: 8,
                            ease: "linear",
                        }}
                        sx={{ display: "flex", gap: 2 }}
                    >
                        {duplicatedImages.map((src, index) => (
                            <Box
                                component="img"
                                key={index}
                                src={src}
                                alt={`Logo ${index + 1}`}
                                sx={{ maxHeight: { md: "60px", sm: "40px", xss: "30px" }, margin: "0 10px" }}
                            />
                        ))}
                    </Stack>
                </Stack>
            </Box>
        </LandingContainer>
    );
};

export default OurCustomers;
