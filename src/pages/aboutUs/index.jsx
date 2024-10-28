// MUI import
import { Stack } from "@mui/material";

// Custom import
import HeroAboutSection from "./HeroSection";
import DemoSection from "./DemoSection";

const AboutUs = () => {
    return (
        <Stack gap={{ md: 15, xss: 6 }}>
            <HeroAboutSection />
            <DemoSection />
        </Stack>
    );
};

export default AboutUs;
