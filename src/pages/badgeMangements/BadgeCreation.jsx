// MUI import
import { Stack } from "@mui/material";

// Custom import
import PageTitle from "../../components/PageTitle";
import SearchBar from "../../components/SearchBar";
import BadgeCreationForm from "./BadgeCreationForm";

const BadgeCreation = () => {
    return (
        <Stack gap={3}>
            <PageTitle title="BadgeCreation" />
            {/* <SearchBar showButton={false} textInButton=""/> */}
            <BadgeCreationForm />
        </Stack>
    );
};

export default BadgeCreation;
