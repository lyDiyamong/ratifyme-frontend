import DateSelectionForm from "../DateSelectionForm";
import SelectForm from "../SelectionForm";
import FormInput from "../FormInput";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import theme from "../../assets/themes";

const GeneralInfoFields = ({ control, schema }) => {
    const genderOptions = [
        { value: 1, label: "Male" },
        { value: 2, label: "Female" },
    ];

    const getDefaultValue = (value) => (value ? value : null);

    return (
        <Stack gap={2}>
            <Typography variant="body1" fontWeight={theme.fontWeight.semiBold} fontSize="24px">
                General Information
            </Typography>
            <Typography sx={{ fontSize: theme.typography.body1, color: theme.palette.customColors.gray500, mb: 1 }}>
                Provide basic personal information details to set up your profile.
            </Typography>
            <FormInput
                name="firstName"
                label="First Name"
                control={control}
                required
                schema={schema?.fields.firstName}
            />
            <FormInput name="lastName" label="Last Name" control={control} required schema={schema?.fields.lastName} />
            <SelectForm
                name="genderId"
                label="Gender"
                options={genderOptions}
                control={control}
                defaultValue={getDefaultValue(schema?.fields.genderId?.defaultValue)}
            />
            <DateSelectionForm control={control} name="dateOfBirth" label="Date of Birth" />
        </Stack>
    );
};

export default GeneralInfoFields;
