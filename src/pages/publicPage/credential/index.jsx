import { Box } from "@mui/system";
import LandingContainer from "../../../components/styles/LandingContainer";
import ImageSwitcher from "./ImageSwitcher";
import CredentialContent from "./CredentialContent";

const Credential = () => {
    return (
        <Box>
            <ImageSwitcher />
            <LandingContainer>
                <CredentialContent earnerData={earnerData} achieveData={achieveData} credUrl={earnerAchieData?.credUrl} credId={credId} />
            </LandingContainer>
        </Box>
    );
};

export default Credential;
