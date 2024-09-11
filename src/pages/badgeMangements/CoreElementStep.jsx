// MUI import
import { Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Custom imports
import SelectForm from "../../components/SelectionForm";
import FormInput from "../../components/FormInput";

const CoreElementStep = ({ control }) => {
    // Data static of the earning criteria select
    const optionEarningCriteria = [
        { value: 'contentCreation', label: 'Content Creation' },
        { value: 'communityEngagement', label: 'Community Engagement' },
        { value: 'referrals', label: 'Referrals' },
        { value: 'skillDevelopment', label: 'Skill Development' },
        { value: 'partnershipAndCollaborations', label: 'Partnership and Collaborations' },
        { value: 'challengesAndCompetitions', label: 'Challenges and Competitions' },
        { value: 'eventParticipation', label: 'Event Participation' },
        { value: 'mentorshipPrograms', label: 'Mentorship Programs' },
        { value: 'projectSubmissions', label: 'Project Submissions' },
        { value: 'courseCompletion', label: 'Course Completion' },
        { value: 'betaTesting', label: 'Beta Testing' },
    ];

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack gap={2}>
                {/* Issuer */}
                <FormInput name="issuer" label="Issuer*" control={control} type="text" required={false} />

                {/* Criteria */}
                <FormInput name="criteria" label="Criteria" control={control} type="text" required={false} />

                {/* Earning Criteria */}
                <SelectForm name="earningCriteria" label="Earning Criteria" options={optionEarningCriteria} control={control} required={false} />

                {/* Duration */}
                <FormInput name="duration" label="Duration" control={control} type="text" required={false} />
            </Stack>
        </LocalizationProvider>
    );
};

export default CoreElementStep;
