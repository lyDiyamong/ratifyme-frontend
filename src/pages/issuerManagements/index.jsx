import React from "react";
import OrganizationCard from "../../components/OrganizationCard";
import AnBSchoolLogo from "../../assets/icons/AnBSchoolLogo.svg"

const IssuerManagement = () => {
    return (
        <div>

            <OrganizationCard
                tag="ORGANIZATION"
                title="Above & Beyond School"
                description="Above & Beyond School students go through the learning path by following the core courses, the recommended courses,and the capstone project. Other than these, they can access +20,000 contents in the A&B LMS to sharpen specific skills."
                logoUrl={AnBSchoolLogo}
                date="Mon 19, Aug 2024"
                showFacebook={true}
                showLinkedIn={true}
            />
        </div>
    );
};

export default IssuerManagement;
