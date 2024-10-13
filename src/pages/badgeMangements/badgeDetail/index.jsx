// React Import
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// MUI Import
import { Tab, Tabs, Typography } from "@mui/material";

// Custom Import
import DashboardContainer from "../../../components/styles/DashboardContainer";
import { useFetchOneBadgeQuery } from "../../../store/api/badgeManagement/badgeApi";
import PageTitle from "../../../components/PageTitle";
import { Description, Group, WorkspacePremium } from "@mui/icons-material";
import { useState } from "react";
import BadgeInfo from "./BadgeInfo";
import EarnerList from "./EarnerList";
import CertificateGenerator from "../../certificateTest";

const BadgeDetail = () => {
    // Fetch ID from the URL
    const { id } = useParams();

    const [selectedEmails, setSelectedEmails] = useState([]);
    // Fetch badge by ID
    const { roleId, issuerData, earnerData } = useSelector((state) => state.global);
    const { data: oneBadge, isLoading, isError } = useFetchOneBadgeQuery(id);
    // Tab state
    const [value, setValue] = useState(0);

    let role = roleId;
    let subtitle;
    let activeUserId;

    switch (role) {
        case 1: {
            role = "admin";
            break;
        }
        case 2: {
            role = "institution";
            subtitle = "Shaping learners, inspiring progress.";
            break;
        }
        case 3: {
            role = "issuer";
            activeUserId = issuerData.id;
            subtitle = "Recognizing skills, empowering futures.";
            break;
        }
        case 4: {
            role = "earner";
            activeUserId = earnerData.id;
            subtitle = "A mark of achievement, a step forward.";
            break;
        }
    }

    // Handler to get emails from IssuerBadgeButton
    const handleGetEmails = (emails) => {
        setSelectedEmails(emails);
    };
    // Tab handling
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Handle loading and error states
    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error fetching badge details.</Typography>;

    // If no badge is returned, render a fallback message
    if (!oneBadge) return <Typography>No badge found with the provided ID.</Typography>;

    return (
        <DashboardContainer sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <PageTitle title="Badge Detail" subtitle={subtitle} />
            <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
                <Tab label="Description" icon={<Description />} iconPosition="start" />
                <Tab label="Earner List" icon={<Group />} iconPosition="start" />
                <Tab label="Your Certificate" icon={<WorkspacePremium />} iconPosition="start" />
            </Tabs>
            {value === 0 && (
                <BadgeInfo
                    badge={oneBadge}
                    userRole={role}
                    activeUserId={activeUserId}
                    onGetEmails={handleGetEmails}
                    emails={selectedEmails}
                />
            )}
            {value === 1 && <EarnerList emails={selectedEmails} />}
            {value === 2 && <CertificateGenerator />}
        </DashboardContainer>
    );
};

export default BadgeDetail;
