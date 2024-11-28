// MUI import
import { Stack } from "@mui/system";
import { Box, Typography } from "@mui/material";

// Custom import
import DateSelectionForm from "../DateSelectionForm";
import SelectForm from "../SelectionForm";
import FormInput from "../FormInput";
import theme from "../../assets/themes";

const GeneralInfoFields = ({ control, schema, errors }) => {
    const genderOptions = [
        { value: 1, label: "Male" },
        { value: 2, label: "Female" },
    ];

    const getDefaultValue = (value) => (value ? value : null);

    return (
        <Stack gap={2}>
            <Box component="div">
                <Typography variant="body1" fontWeight={theme.fontWeight.semiBold} fontSize="20px">
                    General Information
                </Typography>
                <Typography sx={{ fontSize: theme.typography.body1, color: theme.palette.customColors.gray500, mb: 2 }}>
                    Provide basic personal information details to set up your profile such as Fullname, gender and date of birth.
                </Typography>
            </Box>

            <FormInput name="firstName" label="First Name" control={control} required schema={schema?.fields.firstName} />
            <FormInput name="lastName" label="Last Name" control={control} required schema={schema?.fields.lastName} />
            <SelectForm
                name="genderId"
                label="Gender *"
                options={genderOptions}
                control={control}
                defaultValue={getDefaultValue(schema?.fields.genderId?.defaultValue)}
            />
            <Box>
                <DateSelectionForm control={control} name="dateOfBirth" label="Date of Birth *" />
                {errors.dateOfBirth && (
                    <Typography sx={{ fontSize: 12, mx: "14px" }} color="error">
                        {errors.dateOfBirth.message}
                    </Typography>
                )}
            </Box>
        </Stack>
    );
};

export default GeneralInfoFields;
