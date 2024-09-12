import React from "react";
import PageTitle from "../../components/PageTitle";
import SearchBar from "../../components/SearchBar";
import DashboardContainer from "../../components/styles/DashboardContainer";


const BadgeManagement = () => {
    return (
        <DashboardContainer>
            <PageTitle title="Bagde Management " />
            <SearchBar showButton={true} textInButton="+ Add Recipient"/>
        </DashboardContainer>
    );
};

export default BadgeManagement;
