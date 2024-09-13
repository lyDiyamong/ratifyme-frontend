// MUI import
import { Stack, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Custom imports
import theme from "../../assets/themes";
import FormInput from "../../components/FormInput";
import DateSelectionForm from "../../components/DateSelectionForm";

const OptionalStep = ({ control }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack gap={2}>
                {/* Expiration Date */}
                <DateSelectionForm control={control} name="expirationDate" label="Expiration Date" />
                {/* Addition Link */}
                <FormInput label="Addition Link" name="additionLink" control={control} type="text" required={false} />

                {/* Submit button */}
                <Stack alignItems="end">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            color: theme.palette.background.default,
                            borderRadius: theme.customShape.btn,
                            fontWeight: theme.fontWeight.bold,
                        }}
                    >
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </LocalizationProvider>
    );
};

export default OptionalStep;
