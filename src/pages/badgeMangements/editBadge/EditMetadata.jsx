// MUI import
import { Stack, Box } from "@mui/material";

// Custom import
import FormInput from "../../../components/FormInput";
import MultiSelectForm from "../../../components/MultiSelectionForm";
import DateSelectionForm from "../../../components/DateSelectionForm";
import HelperTextForm from "../../../components/alert/HelperTextForm";

const EditMetadata = ({ control, schema, errors }) => {
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
        <Stack
            sx={{
                gap: 2,
            }}
        >
            <Stack gap={3} alignItems="center">
                <Stack gap={3} alignItems="center" flexDirection={{ sm: "row", xss: "column" }} width="100%">
                    {/* Badge Name */}
                    <FormInput
                        name="badgeName"
                        label="Badge Name*"
                        control={control}
                        type="text"
                        required={false}
                        schema={schema.fields.badgeName}
                    />

                    {/* Tags / Language */}
                    <MultiSelectForm
                        name="tagsOrLanguage"
                        label="Tags / Language"
                        options={optionLanguage}
                        control={control}
                        required={false}
                    />
                </Stack>

                <Stack gap={3} alignItems="center" flexDirection={{ sm: "row", xss: "column" }} width="100%">
                    <Box width="100%">
                        {/* Start Date */}
                        <DateSelectionForm control={control} name="startedDate" label="Start Date" required />
                        {errors.startedDate && <HelperTextForm color={"error"} message={errors?.startedDate?.message} />}
                    </Box>
                    <Box width="100%">
                        <DateSelectionForm control={control} name="endDate" label="End Date*" errors={errors} />
                        {errors.endDate && <HelperTextForm color={"error"} message={errors?.endDate?.message} />}
                    </Box>
                </Stack>

                {/* Badge Description */}
                <FormInput
                    schema={schema.fields.badgeDescription}
                    name="badgeDescription"
                    label="Badge Description"
                    control={control}
                    type="text"
                    required={false}
                />
            </Stack>
        </Stack>
    );
};

export default EditMetadata;
