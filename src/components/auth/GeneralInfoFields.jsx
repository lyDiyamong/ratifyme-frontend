import { Grid } from "@mui/material";

import DateSelectionForm from "../DateSelectionForm";
import SelectForm from "../SelectionForm";
import FormInput from "../FormInput";
import { Stack } from "@mui/system";

const GeneralInfoFields = ({ control, schema }) => {
    const genderOptions = [
        { value: 1, label: "Male" },
        { value: 2, label: "Female" },
    ];

    return (
        <Stack gap={2}>
            <FormInput
                name="firstName"
                label="First Name"
                control={control}
                required
                schema={schema?.fields.firstName}
            />
            <FormInput name="lastName" label="Last Name" control={control} required schema={schema?.fields.lastName} />
            <SelectForm name="genderId" label="Gender" options={genderOptions} control={control} />
            <DateSelectionForm control={control} name="dateOfBirth" label="Date of Birth" />
        </Stack>
    );
};

export default GeneralInfoFields;
