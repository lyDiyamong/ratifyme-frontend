// MUI import
import { Stack } from "@mui/material";

// Custom import
import HeroAboutSection from "./HeroSection";
import DemoSection from "./DemoSection";
import CookieConsentAlert from "../../components/alert/CookieConsentAlert";

const AboutUs = () => {
    return (
        <Stack gap={{ md: 15, xss: 6 }}>
            <HeroAboutSection />
            <DemoSection />

            <CookieConsentAlert />
        </Stack>
    );
};

export default AboutUs;
