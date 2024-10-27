// MUI import
import { Stack } from "@mui/material";

// Custom import
import HeroAboutSection from "./HeroSection";
import DemoSection from "./DemoSection";

const AboutUs = () => {
    return (
        <Stack gap={12}>
            <HeroAboutSection />
            <DemoSection />
        </Stack>
    );
};

export default AboutUs;
