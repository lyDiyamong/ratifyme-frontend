// MUI import
import { Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Custom imports
import SelectForm from "../../components/SelectionForm";
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
    const optionAchievementType = [
        { value: "contentCreation", label: "Content Creation" },
        { value: "communityEngagement", label: "Community Engagement" },
        { value: "referrals", label: "Referrals" },
        { value: "skillDevelopment", label: "Skill Development" },
        { value: "partnershipAndCollaborations", label: "Partnership and Collaborations" },
        { value: "challengesAndCompetitions", label: "Challenges and Competitions" },
        { value: "eventParticipation", label: "Event Participation" },
        { value: "mentorshipPrograms", label: "Mentorship Programs" },
        { value: "projectSubmissions", label: "Project Submissions" },
        { value: "courseCompletion", label: "Course Completion" },
        { value: "betaTesting", label: "Beta Testing" },
    ];

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
                <SelectForm
                    name="tagsOrLanguage"
                    label="Tags / Language"
                    options={optionLanguage}
                    control={control}
                    required={false}
                />

                {/* Achievement Type */}
                <SelectForm
                    name="achievementType"
                    label="Achievement Type*"
                    options={optionAchievementType}
                    control={control}
                    required={false}
                />
            </Stack>
        </LocalizationProvider>
    );
};

export default MetadataStep;
