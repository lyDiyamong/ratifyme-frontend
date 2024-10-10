import { Stack, TextField, Typography } from "@mui/material";
import theme from "../../../assets/themes";
import FormInput from "../../../components/FormInput";
import MultiSelectForm from "../../../components/MultiSelectionForm";
import DateSelectionForm from "../../../components/DateSelectionForm";

const EditMetadata = ({ control }) => {
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
            {/* <Stack>
                <Typography variant="h4" color="primary" fontWeight={theme.fontWeight.bold}>
                    Metadata
                </Typography>
                <Typography variant="body1" color="gray">
                    This information related to Metadata.
                </Typography>
            </Stack> */}
            <Stack gap={3} alignItems="center">
                <Stack gap={3} alignItems="center" flexDirection={{ sm: "row", xss: "column" }} width="100%">
                    {/* Badge Name */}
                    <FormInput name="badgeName" label="Badge Name" control={control} type="text" required={false} />

                    {/* Issued On */}
                    <DateSelectionForm control={control} name="issuedOn" label="Issued On" />
                </Stack>

                <Stack gap={3} alignItems="center" flexDirection={{ sm: "row", xss: "column" }} width="100%">
                    {/* Start Date */}
                    <DateSelectionForm control={control} name="startedDate" label="Start Date" />

                    {/* Tags / Language */}
                    <MultiSelectForm
                        name="tagsOrLanguage"
                        label="Tags / Language"
                        options={optionLanguage}
                        control={control}
                        required={false}
                    />
                </Stack>

                {/* Badge Description */}
                <FormInput
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
