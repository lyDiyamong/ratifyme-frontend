// MUI import
import { Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Custom imports
import SelectForm from "../../components/SelectionForm";
import MultiSelectForm from "../../components/MultiSelectionForm";
import FormInput from "../../components/FormInput";
import DateSelectionForm from "../../components/DateSelectionForm";

const MetadataStep = ({ control }) => {
    // Data static of Option Language
    const optionLanguage = [
        { value: "contentCreation", label: "JavaScript" },
        { value: "ReactJs", label: "React Js" },
        { value: "NodeJs", label: "Node Js" },
        { value: "python", label: "Python" },
        { value: "typescript", label: "TypeScript" },
        { value: "htmlCss", label: "HTML & CSS" },
        { value: "angular", label: "Angular" },
        { value: "vueJs", label: "Vue Js" },
        { value: "ruby", label: "Ruby" },
        { value: "php", label: "PHP" },
        { value: "java", label: "Java" },
        { value: "golang", label: "Go" },
    ];

    // Data static of Option Achievement Type
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack gap={2}>
                {/* Badge Name */}
                <FormInput name="badgeName" label="Badge Name*" control={control} type="text" required={false} />

                {/* Issued On */}
                <DateSelectionForm control={control} name="issuedOn" label="Issued On*" />
                {/* Start Date */}
                <DateSelectionForm control={control} name="startDate" label="Start Date" />
                {/* End Date */}
                <DateSelectionForm control={control} name="endDate" label="End Date" />

                {/* Badge Description */}
                <FormInput
                    name="badgeDescription"
                    label="Badge Description"
                    control={control}
                    type="text"
                    required={false}
                />

                {/* Tags / Language */}
                <MultiSelectForm
                    name="tagsOrLanguage"
                    label="Tags / Language"
                    options={optionLanguage}
                    control={control}
                    required={false}
                />

                {/* Achievement Type
                <MultiSelectForm
                    name="achievementType"
                    label="Achievement Type*"
                    options={optionAchievementType}
                    control={control}
                    required={false}
                /> */}
            </Stack>
        </LocalizationProvider>
    );
};

export default MetadataStep;
