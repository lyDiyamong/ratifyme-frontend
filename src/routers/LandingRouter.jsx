import { Route, Routes } from "react-router-dom";
import LandingLayout from "../layouts/landing";
import HomePage from "../pages/landing/index";
import ContactUsPage from './../pages/contactus'
import PricePage from "../pages/prices/index";
import NotFoundPage from "../pages/notFound";

const LandingRouter = () => {
    return (
        <Routes>
            <Route element={<LandingLayout />}>
                <Route path="/" element={<HomePage />}/>
                <Route path="/price" element={<PricePage />} />
                <Route path="/contactus" element={<ContactUsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default LandingRouter;
