import React from "react";
import PageTitle from "../../components/PageTitle";
import SearchBar from "../../components/SearchBar";

const BadgeManagement = () => {
    return (
        <div>
            <PageTitle title="Bagde Management " />
            <SearchBar showButton={true} textInButton="+ Add Recipient"/>
        </div>
    );
};

export default BadgeManagement;
