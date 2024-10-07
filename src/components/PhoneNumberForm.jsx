import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { Controller } from 'react-hook-form';
import { Box, FormHelperText, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '../assets/themes';

// Utility function to format phone numbers
export const formatPhoneNumber = (phoneNumber) => {
    if (typeof phoneNumber !== "string" || phoneNumber.trim() === "") {
        console.error("Invalid phone number: Phone number must be a non-empty string.");
        return null;
    }

    // Ensure phone number starts with "+" and remove leading zero after the country code
    if (!phoneNumber.startsWith('+')) {
        phoneNumber = `+${phoneNumber}`;
    }

    // Remove leading zero after country code if it exists
    phoneNumber = phoneNumber.replace(/^\+(\d{1,3})0/, '+$1');

    // Return the formatted phone number
    return phoneNumber;
};

const StyledPhoneInput = styled(PhoneInput)(() => ({
    '& .form-control': {
        width: '100%',
        backgroundColor: 'inherit',
        fontSize: '16px',
        borderColor: theme.palette.grey[400],
        borderRadius: theme.customShape.input,
        height: '56px',
    },
    '& .flag-dropdown': {
        borderColor: theme.palette.grey[400],
        borderRadius: theme.customShape.input,
        backgroundColor: 'inherit',
        transition: 'all 0.3s ease',
        '&:hover, &:focus, &:active': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 5px ${theme.palette.primary.light}`,
            borderRadius: theme.customShape.input,
            backgroundColor: 'inherit',
        },
    },
    '& .selected-flag': {
        '&:focus, &:active': {
            borderRadius: theme.customShape.input,
            backgroundColor: 'inherit',
        },
    },
}));

const PhoneNumberForm = ({ control, name, label, required, schema, startIcon }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Box>
                    <Box display="flex" alignItems="center">
                        {startIcon && (
                            <InputAdornment position="start">
                                {startIcon}
                            </InputAdornment>
                        )}
                        <StyledPhoneInput
                            {...field}
                            country={'kh'}
                            value={field.value || ''}
                            onChange={(value) => {
                                const formattedPhoneNumber = formatPhoneNumber(value);
                                field.onChange(formattedPhoneNumber);
                            }}
                            inputProps={{
                                name: name,
                                required: required,
                                label: label
                            }}
                        />
                    </Box>
                    {fieldState.error && (
                        <FormHelperText error>{fieldState.error.message || "Invalid phone number"}</FormHelperText>
                    )}
                </Box>
            )}
            rules={{
                required: required ? 'Phone number is required' : false,
                validate: schema ? (value) => schema.isValidSync(value) || "Invalid phone number" : null
            }}
        />
    );
};

export default PhoneNumberForm;
