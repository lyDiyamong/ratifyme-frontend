// React library import
import { Route, Routes } from "react-router-dom";

// Custom import
import LandingLayout from "../layouts/landing";
import HomePage from "../pages/landing/index";
import ContactUsPage from "./../pages/contactus";
import PricePage from "../pages/prices/index";
import NotFoundPage from "../pages/notFound";
import Credential from "../pages/publicPage/credential";
import AboutUs from "../pages/aboutUs";
import AboutOurTeam from "../pages/aboutUs/OurTeam";

const LandingRouter = () => {
    return (
        <Routes>
            <Route element={<LandingLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/price" element={<PricePage />} />
                <Route path="/contactus" element={<ContactUsPage />} />
                <Route path="/credential/:credId" element={<Credential />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/aboutOurTeam" element={<AboutOurTeam />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default LandingRouter;
