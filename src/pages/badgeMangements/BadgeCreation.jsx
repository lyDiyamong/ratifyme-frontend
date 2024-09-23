// MUI import
import { Stack } from "@mui/material";

// Custom import
import PageTitle from "../../components/PageTitle";
import DashboardContainer from "../../components/styles/DashboardContainer";
import BadgeCreationForm from "./BadgeCreationForm";

const BadgeCreation = () => {
    return (
        <DashboardContainer sx={{ pb: 4 }}>
            <Stack gap={3}>
                <PageTitle title="BadgeCreation" />
                {/* <SearchBar showButton={false} textInButton=""/> */}
                <BadgeCreationForm />
            </Stack>
        </DashboardContainer>
    );
};

export default BadgeCreation;
