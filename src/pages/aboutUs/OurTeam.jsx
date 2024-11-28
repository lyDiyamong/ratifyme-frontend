// MUI import
import { Stack } from "@mui/material";

// Custom import
import MemberCardInfo from "./MemberCardInfo";
import CookieConsentAlert from "../../components/alert/CookieConsentAlert";

const AboutOurTeam = () => {
    return (
        <Stack gap={12}>
            <MemberCardInfo />

            <CookieConsentAlert />
        </Stack>
    );
};

export default AboutOurTeam;
