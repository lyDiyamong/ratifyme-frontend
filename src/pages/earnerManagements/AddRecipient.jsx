// MUI import
import { Stack } from "@mui/material";

// Custom import
import PageTitle from "../../components/PageTitle";
import AddRecipientForm from "./AddRecipientForm";

const AddRecipient = () => {
    return <Stack gap={3}>
        <PageTitle title="Add Recipient"/>
        <AddRecipientForm />
    </Stack>;
};

export default AddRecipient;
