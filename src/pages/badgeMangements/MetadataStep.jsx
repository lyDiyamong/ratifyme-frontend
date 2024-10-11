import { Stack, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Custom imports
import SelectForm from "../../components/SelectionForm";
import MultiSelectForm from "../../components/MultiSelectionForm";
import FormInput from "../../components/FormInput";
import DateSelectionForm from "../../components/DateSelectionForm";

const MetadataStep = ({ control, errors }) => {
    // Static data for Option Language
    const optionLanguage = [
        { name: "JavaScript", label: "JavaScript" },
        { name: "ReactJs", label: "React Js" },
        { name: "NodeJs", label: "Node Js" },
        { name: "python", label: "Python" },
        { name: "typescript", label: "TypeScript" },
        { name: "htmlCss", label: "HTML & CSS" },
        { name: "angular", label: "Angular" },
        { name: "vueJs", label: "Vue Js" },
        { name: "ruby", label: "Ruby" },
        { name: "php", label: "PHP" },
        { name: "java", label: "Java" },
        { name: "golang", label: "Go" },
    ];

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack gap={2} component="form">
                {/* Badge Name */}
                <FormInput name="badgeName" label="Badge Name*" control={control} type="text" required={true} />
                {/* Issued On */}
                <DateSelectionForm control={control} name="issuedOn" label="Issued On*" />

                {/* Start Date */}
                <DateSelectionForm control={control} name="startDate" label="Start Date*" />
                {errors.startDate && (
                    <Typography sx={{ fontSize: 12, mx: "14px", mt: "3px" }} color="error">
                        {errors.startDate.message}
                    </Typography>
                )}

                {/* End Date */}
                <DateSelectionForm control={control} name="endDate" label="End Date*" />
                {errors.endDate && (
                    <Typography sx={{ fontSize: 12, mx: "14px", mt: "3px" }} color="error">
                        {errors.endDate.message}
                    </Typography>
                )}

                {/* Badge Description */}
                <FormInput
                    name="badgeDescription"
                    label="Badge Description*"
                    control={control}
                    type="text"
                    required={true}
                />

                {/* Tags / Language */}
                <MultiSelectForm
                    name="tagsOrLanguage"
                    label="Tags / Language"
                    options={optionLanguage}
                    control={control}
                    required={true}
                />
            </Stack>
        </LocalizationProvider>
    );
};

export default MetadataStep;
