import BadgeDetailCustom from "../../components/BadgeDetailCustom";
import DashboardContainer from "../../components/styles/DashboardContainer";

const BadgeDetail = () => {
    const sampleBadge = {
        image: "path-to-image",
        title: "Data Visualization & Communication",
        issuer: "Above & Beyond School",
        description: "This Certification verifies...",
        criteria: "Data Analysis, Data Science",
        issuedDate: "Mon 19, Aug 2024",
        expiryDate: "Mon 19, Aug 2025",
        duration: "30 days",
        achievementType: "Certificate",
        tags: ["Python", "SQL", "Pandas", "Numpy"],
        attributes: [
            { name: "Python exam", value: 63 },
            { name: "SQL Exam", value: 72 },
            { name: "Forecasting", value: 80 },
        ],
    };

    return (
        <DashboardContainer sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <BadgeDetailCustom
                badge={sampleBadge}
                showAddEarnerButton={true}
                showIssueButton={false}
                showDeleteButton={true}
                userRole="issuer"
            />
        </DashboardContainer>
    );
};
export default BadgeDetail;
