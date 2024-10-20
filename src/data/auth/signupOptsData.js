import theme from "../../assets/themes";
import IssuerImg from "../../assets/images/Issuer.png";
import UniversifyImg from "../../assets/images/University.png";
import CertificateImg from "../../assets/images/Certificate.png";

export const signupOptsData = [
    {
        title: "Institution",
        description:
            "Sign up as an institution to manage badge issuance, track performance, and create verifiable credentials for your learners.",
        circleBg: theme.palette.primary.light,
        icon: UniversifyImg,
        iconWidth: "80px",
    },
    {
        title: "Issuer",
        description:
            "Sign up as an issuer to create, award, and manage badges for achievements, certifications, and skills recognition.",
        circleBg: theme.palette.customColors.orange200,
        icon: IssuerImg,
    },
    {
        title: "Earner",
        description:
            "Sign up as an earner to collect and showcase digital badges for your skills and achievements, and share them with employers.",
        circleBg: theme.palette.customColors.green200,
        icon: CertificateImg,
    },
];
