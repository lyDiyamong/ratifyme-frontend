

import { Grid } from "@mui/material";

import DateSelectionForm from "../DateSelectionForm";
import SelectForm from "../SelectionForm";
import FormInput from "../FormInput";


const GeneralInfoFields = ({ control, schema }) => {
    const genderOptions = [
        { value: 1, label: "Male" },
        { value: 2, label: "Female" },
    ];

    return (
        <Grid container spacing={2}>
            <Grid item xss={12} sm={12}>
                <FormInput name="firstName" label="First Name" control={control} required schema={schema?.fields.firstName} />
            </Grid>
            <Grid item xss={12} sm={12}>
                <FormInput name="lastName" label="Last Name" control={control} required schema={schema?.fields.lastName} />
            </Grid>
            <Grid item xss={12} sm={12}>
                <SelectForm name="genderId" label="Gender" options={genderOptions} control={control} />
            </Grid>
            <Grid item xss={12} sm={12}>
                <DateSelectionForm control={control} name="dateOfBirth" label="Date of Birth" />
            </Grid>
        </Grid>
    );
};

export default GeneralInfoFields;
