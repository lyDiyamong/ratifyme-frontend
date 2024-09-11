import React from "react";
import { Box, Paper, Button, TextField, MobileStepper, Typography, Stack } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import theme from "../../assets/themes";
import DashboardContainer from "../../components/styles/DashboardContainer";
import ImageSelection from "./ImageSelection";
import SelectForm from "../../components/SelectionForm";

const steps = [
    {
        description: "Core Elements :",
        details:
            "A clear statement of the skills, knowledge, or abilities that a learner must demonstrate to earn the badge.",
        inputs: [
            {
                label: "Issuer*",
                name: "issuer",
                rules: { required: false },
            },
            {
                label: "Criteria*",
                name: "criteria",
                rules: { required: false },
            },
            {
                label: "Earning Criteria*",
                name: "earningCriteria",
                rules: { required: false },
                component: SelectForm,
                options: [
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
                    { value: 'bugReporting', label: 'Bug Reporting' },
                    { value: 'surveyParticipation', label: 'Survey Participation' },
                    { value: 'productReviews', label: 'Product Reviews' },
                    { value: 'socialMediaPromotion', label: 'Social Media Promotion' },
                    { value: 'feedbackAndSuggestions', label: 'Feedback and Suggestions' },
                    { value: 'platformModeration', label: 'Platform Moderation' },
                    { value: 'openSourceContributions', label: 'Open Source Contributions' },
                    { value: 'collaborativeResearch', label: 'Collaborative Research' },
                    { value: 'hostingWebinarsOrWorkshops', label: 'Hosting Webinars or Workshops' }
                ],
            },
            {
                label: "Duration",
                name: "duration",
                rules: { required: false },
            },
        ],
    },
    {
        description: "Metadata of the Badge :",
        details:
            "A clear statement capture essential information about learning and achievements by storing this metadata inside the badge image.",
        inputs: [
            {
                label: "Badge Name*",
                name: "bagdeName",
                rules: { required: false },
            },
            {
                label: "Issued On*",
                name: "issuedOn",
                rules: { required: false },
            },
            {
                label: "Valid Start",
                name: "validStart",
                rules: { required: false },
            },
            {
                label: "Valid End",
                name: "validEnd",
                rules: { required: false },
            },
            {
                label: "Badge Description",
                name: "badgeDescription",
                rules: { required: false },
            },
            {
                label: "Tags / Language",
                name: "tagsOrLanguage",
                rules: { required: false },
            },
            {
                label: "Achievement Type*",
                name: "achievementType",
                rules: { required: false },
                component: SelectForm,
                options: [
                    { value: 'topContributor', label: 'Top Contributor' },
                    { value: 'communityLeader', label: 'Community Leader' },
                    { value: 'referralMaster', label: 'Referral Master' },
                    { value: 'skillMastery', label: 'Skill Mastery' },
                    { value: 'collaborationExpert', label: 'Collaboration Expert' },
                    { value: 'challengeChampion', label: 'Challenge Champion' },
                    { value: 'eventOrganizer', label: 'Event Organizer' },
                    { value: 'mentorOfTheMonth', label: 'Mentor of the Month' },
                    { value: 'projectInnovator', label: 'Project Innovator' },
                    { value: 'courseCompleter', label: 'Course Completer' },
                    { value: 'bugHunter', label: 'Bug Hunter' },
                    { value: 'betaTester', label: 'Beta Tester' },
                    { value: 'surveyGuru', label: 'Survey Guru' },
                    { value: 'productReviewer', label: 'Product Reviewer' },
                    { value: 'socialMediaInfluencer', label: 'Social Media Influencer' },
                    { value: 'feedbackSpecialist', label: 'Feedback Specialist' },
                    { value: 'platformModerator', label: 'Platform Moderator' },
                    { value: 'openSourceContributor', label: 'Open Source Contributor' },
                    { value: 'researchPartner', label: 'Research Partner' },
                    { value: 'webinarHost', label: 'Webinar Host' }
                ],
            },
        ],
    },
    {
        description: "Optional Elements :",
        details:
            "A optional statement of the badge. The specific elements required for an Open Badge may vary depending on the implementation and the preferences of the issuer",
        inputs: [
            {
                label: "Expiration Date",
                name: "expirationDate",
                rules: { required: "Expiration Date is required" },
            },
            {
                label: "Addition Links",
                name: "additionLinks",
                rules: { required: "Addition Links is required" },
            },
        ],
    },
];

const BadgeCreationForm = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const {
        control,
        handleSubmit,
        trigger,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            issuer: "",
            criteria: "",
            earningCriteria: "",
            duration: "",
            bagdeName: "",
            issuedOn: "",
            validStart: "",
            validEnd: "",
            badgeDescription: "",
            tagsOrLanguage: "",
            achievementType: "",
            expirationDate: "",
            additionLinks: "",
        },
    });
    const maxSteps = steps.length;

    const handleNext = async () => {
        const isValid = await trigger();
        if (isValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        <DashboardContainer>
            <Stack
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    padding: "32px",
                    bgcolor: theme.palette.customColors.white,
                    gap: 10,
                    mb: 3,
                }}
            >
                <ImageSelection />

                <Box>
                    <Stack direction="row" flexDirection={{ xss: "column", md: "row" }} sx={{ gap: 2, mb: 4 }}>
                        <Stack gap={2}>
                            <Typography component="h3" variant="h3" fontWeight={theme.fontWeight.semiBold}>
                                {steps[activeStep].description}
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    maxWidth: "500px",
                                    width: "100%",
                                    color: theme.palette.text.disabled,
                                }}
                            >
                                {steps[activeStep].details}
                            </Typography>
                        </Stack>

                        <Box sx={{ maxWidth: "100%", width: "100%" }}>
                            {steps[activeStep].inputs.map((input, index) => (
                                input.component ? (
                                    <Controller
                                        key={`${input.name}-${index}`}
                                        name={input.name}
                                        control={control}
                                        rules={input.rules}
                                        render={({ field }) => (
                                            <SelectForm
                                                {...field}
                                                name={input.name}
                                                control={control}
                                                options={input.options}
                                                label={input.label}
                                                required={input.rules?.required}
                                            />
                                        )}
                                    />
                                ) : (
                                    <Controller
                                        key={`${input.name}-${index}`}
                                        name={input.name}
                                        control={control}
                                        rules={input.rules}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={input.label}
                                                fullWidth
                                                margin="normal"
                                                error={!!errors[input.name]}
                                                helperText={errors[input.name]?.message}
                                                borderRadius={theme.customShape.borderRadius}
                                                InputLabelProps={{ sx: { color: theme.palette.text.primary } }}
                                                sx={{
                                                    "& .MuiInputLabel-root": {
                                                        color: theme.palette.text.secondary,
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                )
                            ))}

                            {activeStep === maxSteps - 1 && (
                                <Stack direction="row" sx={{ width: "100%", my: 2, justifyContent: "flex-end" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            borderRadius: theme.customShape.btn,
                                            color: theme.palette.customColors.white,
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Stack>
                            )}
                        </Box>
                    </Stack>
                    <MobileStepper
                        variant="text"
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                Next
                                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                Back
                            </Button>
                        }
                    />
                </Box>
            </Stack>
        </DashboardContainer>
    );
};

export default BadgeCreationForm;
