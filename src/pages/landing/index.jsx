// React library import
import WhatWeDo from "./WhatWeDo";
import Testimonial from "./Testimonial";
import OurCustomers from "./OurCustomer.jsx";
import Faq from "./Faq";
import HeroSection from "./HeroSection.jsx";
import { Stack } from "@mui/material";
import HowItWorks from "./HowItWorks.jsx";
import SecondHeadTitle from "./SecondHeadTitle.jsx";

const HomePage = () => {
    return (
        <Stack gap={15}>
            <HeroSection />
            <OurCustomers />
            <SecondHeadTitle />
            <HowItWorks />
            <WhatWeDo />

            {/* <Testimonial /> */}
            <Faq />
        </Stack>
    );
};

export default HomePage;
