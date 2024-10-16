// React Import
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// MUI Import
import { Tab, Tabs, Typography } from "@mui/material";
import { Description, Group, WorkspacePremium } from "@mui/icons-material";

// Custom Import
import DashboardContainer from "../../../components/styles/DashboardContainer";
import PageTitle from "../../../components/PageTitle";
import BadgeInfo from "./BadgeInfo";
import EarnerList from "./EarnerList";
import CertificateGenerator from "./CertificateGenerator";

// Api import
import { useFetchOneBadgeQuery } from "../../../store/api/badgeManagement/badgeApi";

const BadgeDetail = () => {
    // Fetch ID from the URL
    const { id } = useParams();

    const [selectedEmails, setSelectedEmails] = useState([]);
    // Fetch badge by ID
    const { roleId, issuerData, earnerData } = useSelector((state) => state.global);
    const { data: oneBadgeRes, isLoading, isError } = useFetchOneBadgeQuery(id);
    const oneBadge = oneBadgeRes?.data
    // Tab state
    const [value, setValue] = useState(0);

    let role = roleId;
    let subtitle;
    let activeUserId;
    let renderedTab

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
            renderedTab = <EarnerList emails={selectedEmails} />
            break;
        }
        case 4: {
            role = "earner";
            activeUserId = earnerData.id;
            subtitle = "A mark of achievement, a step forward.";
            renderedTab = <CertificateGenerator badge={oneBadge} />
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


    return (
        <DashboardContainer sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <PageTitle title="Badge Detail" subtitle={subtitle} />
            <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
                <Tab label="Description" icon={<Description />} iconPosition="start" />
                {role === "issuer" && <Tab label="Earner List" icon={<Group />} iconPosition="start" />}
                {role === "earner" && <Tab label="Your Certificate" icon={<WorkspacePremium />} iconPosition="start" />}
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
            {value === 1 && renderedTab}
        </DashboardContainer>
    );
};

export default BadgeDetail;
