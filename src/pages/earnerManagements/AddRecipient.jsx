// MUI import
import { Stack } from "@mui/material";

// Custom import
import PageTitle from "../../components/PageTitle";
import AddRecipientForm from "./AddRecipientForm";

// =========== Start AddRecipient ===========
const AddRecipient = () => {
    return <Stack gap={3}>
        {/* Start page's title */}
        <PageTitle title="Add Recipient"/>
        {/* Start Add Recipient input field form */}
        <AddRecipientForm />
    </Stack>;
};

export default AddRecipient;
// =========== End AddRecipient ===========