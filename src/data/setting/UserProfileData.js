//Custom Import
import PhoneNumberSvg from "../../assets/icons/Phone.svg";
import BirthDateSvg from "../../assets/icons/BirthDate.Svg";
import EmailSvg from "../../assets/icons/Email.svg";
import OrganizationSvg from "../../assets/icons/Organization.svg";
import EducationSvg from "../../assets/icons/Education.svg";
import CountrySvg from "../../assets/icons/Country.svg";
import EarnerProfileSvg from "../../assets/images/EarnerProfile.svg"

//Identity User Profile Data
export const ProfileIdentityData = 
{
    profilepic: EarnerProfileSvg,
    username: "John Smith",
    role: "Student",
}
//Grid User Profile Data
export const ProfileInfoData = [
    {
        id: 1,
        icon: PhoneNumberSvg,
        title: "Phone",
        content: "099 999 123",
    },
    {
        id: 2,
        icon: BirthDateSvg,
        title: "Date of Birth",
        content: "23 / 01 / 2000",
    },
    {
        id: 3,
        icon: EmailSvg,
        title: "Email",
        content: "john12@gmail.com",
    },
    {
        id: 4,
        icon: OrganizationSvg,
        title: "Organization",
        content: "Above and Beyond",
    },
    {
        id: 5,
        icon: EducationSvg,
        title: "Education",
        content: "RUPP",
    },
    {
        id: 6,
        icon: CountrySvg,
        title: "Country",
        content: "Cambodia",
    },

];
