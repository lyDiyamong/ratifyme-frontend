import { Route, Routes } from "react-router-dom";
import LandingLayout from "../layouts/landing";
import HomePage from "../pages/landing";
import ContactUsPage from "../pages/contactus";

const LandingRouter = () => {
    return (
        <Routes>
            <Route element={<LandingLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/contactus" element={<ContactUsPage />} />
            </Route>
        </Routes>
    );
};

export default LandingRouter;
