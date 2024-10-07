// src/data/profileInfoConfig.js
import BirthDateIcon from "../../assets/icons/DateOfBirth.svg";
import EmailIcon from "../../assets/icons/Email.svg";
import OrganizationIcon from "../../assets/icons/Organization.svg";
import PhoneIcon from "../../assets/icons/Phone.svg";
import GenderIcon from "../../assets/icons/Gender.svg";
import EducationIcon from "../../assets/icons/Education.svg";
import Link from "../../assets/icons/Link.svg";

const profileInfoConfig = {
    admin: [
        {
            icon: PhoneIcon,
            label: "Phone",
            valueKey: "phoneNumber",
        },
        {
            icon: EmailIcon,
            label: "Email",
            valueKey: "email",
        },
        {
            icon: BirthDateIcon,
            label: "Date of Birth",
            valueKey: "dateOfBirth",
        },
        {
            icon: OrganizationIcon,
            label: "Organization",
            valueKey: "Organization",
        },
        {
            icon: Link,
            label: "Link",
            valueKey: "intitutionLink",
        },
    ],
    institutionOwner: [
        {
            icon: PhoneIcon,
            label: "Phone",
            valueKey: "phoneNumber",
        },
        {
            icon: EmailIcon,
            label: "Email",
            valueKey: "email",
        },
        {
            icon: BirthDateIcon,
            label: "Date of Birth",
            valueKey: "dateOfBirth",
        },
        {
            icon: OrganizationIcon,
            label: "Organization",
            valueKey: "Organization",
        },
        {
            icon: Link,
            label: "Link",
            valueKey: "intitutionLink",
        },
    ],
    issuer: [
        {
            icon: PhoneIcon,
            label: "Phone",
            valueKey: "phoneNumber",
        },
        {
            icon: EmailIcon,
            label: "Email",
            valueKey: "email",
        },
        {
            icon: BirthDateIcon,
            label: "Date of Birth",
            valueKey: "dateOfBirth",
        },
        {
            icon: GenderIcon,
            label: "Gender",
            valueKey: "Gender.name",
        },
        {
            icon: OrganizationIcon,
            label: "Organization",
            valueKey: "Organization",
        },
        {
            icon: Link,
            label: "Link",
            valueKey: "intitutionLink",
        },
    ],
    earner: [
        {
            icon: PhoneIcon,
            label: "Phone",
            valueKey: "phoneNumber",
        },
        {
            icon: EmailIcon,
            label: "Email",
            valueKey: "email",
        },
        {
            icon: BirthDateIcon,
            label: "Date of Birth",
            valueKey: "dateOfBirth",
        },
        {
            icon: GenderIcon,
            label: "Gender",
            valueKey: "Gender.name",
        },
        {
            icon: EducationIcon,
            label: "Education",
            valueKey: "AcademicBackground.Institution.name",
        },
    ],
};

export const getProfileInfo = (roleName) => {
    return profileInfoConfig[roleName] || [{ label: "No data available for this role" }];
};
