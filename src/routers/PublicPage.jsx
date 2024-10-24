import { Route, Routes } from "react-router-dom";
import LandingLayout from "../layouts/landing";
import Credential from "../pages/publicPage/credential";
import NotFoundPage from "../pages/notFound";

const PublicPageRouter = () => {
    return (
        <Routes>
            <Route element={<LandingLayout />}>
            {/* <Route> */}
                <Route path="/credential/:credId" element={<Credential />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default PublicPageRouter;
