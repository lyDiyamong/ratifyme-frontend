import { Route, Routes } from "react-router-dom";
import LandingLayout from "../layouts/landing";
import Credential from "../pages/publicPage/credential";

const PublicPageRouter = () => {
    return (
        <Routes>
            <Route element={<LandingLayout />}>
            {/* <Route> */}
                <Route path="/credential" element={<Credential />} />
            </Route>
        </Routes>
    );
};

export default PublicPageRouter;
