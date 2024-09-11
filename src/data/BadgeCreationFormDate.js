import SelectForm from "../components/SelectionForm";

export const steps = [
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
          {
              label: "Tags / Language",
              name: "tagsOrLanguage",
              rules: { required: false },
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