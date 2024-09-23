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
