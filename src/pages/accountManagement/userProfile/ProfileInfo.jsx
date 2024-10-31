// React library import
import { useSelector } from "react-redux";

// MUI import
import { Box, Stack, Typography } from "@mui/material";

// Custom import
import BirthDateIcon from "../../../assets/icons/DateOfBirth.svg";
import EmailIcon from "../../../assets/icons/Email.svg";
import OrganizationIcon from "../../../assets/icons/Organization.svg";
import PhoneIcon from "../../../assets/icons/Phone.svg";
import GenderIcon from "../../../assets/icons/Gender.svg";
import EducationIcon from "../../../assets/icons/Education.svg";
import Link from "../../../assets/icons/Link.svg";
import formatPhoneNumber from "../../../utils/formatPhoneNumber";
import FormatDate from "../../../utils/formatDate";
import theme from "../../../assets/themes";

// API import
import { useFetchInfoUserByIdQuery } from "../../../store/api/users/userInfoProfileApi";

// =========== Start Profile info configuration ===========
const profileInfoConfig = {
    admin: [
        { icon: PhoneIcon, label: "Phone", valueKey: "phoneNumber" },
        { icon: EmailIcon, label: "Email", valueKey: "email" },
        { icon: BirthDateIcon, label: "Date of Birth", valueKey: "dateOfBirth" },
        { icon: GenderIcon, label: "Gender", valueKey: "Gender.name" },
    ],
    institutionOwner: [
        { icon: PhoneIcon, label: "Phone", valueKey: "phoneNumber" },
        { icon: EmailIcon, label: "Email", valueKey: "email" },
        { icon: BirthDateIcon, label: "Date of Birth", valueKey: "dateOfBirth" },
        { icon: GenderIcon, label: "Gender", valueKey: "Gender.name" },
        { icon: OrganizationIcon, label: "Organization", valueKey: "institutionName" },
    ],
    issuer: [
        { icon: PhoneIcon, label: "Phone", valueKey: "phoneNumber" },
        { icon: EmailIcon, label: "Email", valueKey: "email" },
        { icon: BirthDateIcon, label: "Date of Birth", valueKey: "dateOfBirth" },
        { icon: GenderIcon, label: "Gender", valueKey: "Gender.name" },
        { icon: OrganizationIcon, label: "Organization", valueKey: "Institution.institutionName" },
        { icon: Link, label: "Link", valueKey: "Institution.institutionWebsiteUrl" },
    ],
    earner: [
        { icon: PhoneIcon, label: "Phone", valueKey: "phoneNumber" },
        { icon: EmailIcon, label: "Email", valueKey: "email" },
        { icon: BirthDateIcon, label: "Date of Birth", valueKey: "dateOfBirth" },
        { icon: GenderIcon, label: "Gender", valueKey: "Gender.name" },
        { icon: EducationIcon, label: "Education", valueKey: "AcademicBackground.AcademicLevel.name" },
    ],
};
// =========== End Profile info configuration ===========

// Utility function to get value from nested objects based on a string key path
const getValue = (obj, keyPath) => {
    if (!keyPath || typeof keyPath !== "string") {
        return "N/A";
    }
    return keyPath.split(".").reduce((o, k) => (o || {})[k], obj);
};

// =========== Start ProfileInfoContainer ===========
const ProfileInfoContainer = () => {
    // Fetching data from table user, institution, issuer and earner
    const { userId, institutionData, issuerData, earnerData } = useSelector((state) => state.global);
    const { data: userInfo, isLoading: isLoadingUser } = useFetchInfoUserByIdQuery(userId, { skip: !userId });

    if (isLoadingUser) {
        return <Typography>Loading...</Typography>;
    }

    const userData = userInfo?.data;
    const roleName = userData?.Role?.name;

    const details = profileInfoConfig[roleName] || [{ label: "No data available for this role" }];

    return (
        <Stack
            flexDirection="row"
            alignItems="start"
            sx={{
                boxShadow: theme.customShadows.default,
                borderRadius: theme.customShape.section,
                p: { xss: "24px", sm: "24px" },
                bgcolor: theme.palette.customColors.white,
            }}
        >
            <Stack direction="column" justifyContent="center" width="100%">
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: theme.fontWeight.semiBold, mb: 1 }}>
                        Personal Information
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.disabled }}>
                        Your personal information is crucial for us to provide you with tailored services.
                    </Typography>
                </Box>
                <Stack mt={3} spacing={3} justifyContent="start" width="100%">
                    {details.map(({ icon, label, valueKey }, index) => {
                        let value =
                            roleName === "admin" && label === "Organization"
                                ? "Tech-A"
                                : getValue(userData, valueKey) ||
                                  getValue(institutionData, valueKey) ||
                                  getValue(issuerData, valueKey) ||
                                  getValue(earnerData, valueKey) ||
                                  "N/A";

                        if (label === "Date of Birth") {
                            value = FormatDate(value);
                        } else if (label === "Phone") {
                            value = formatPhoneNumber(value);
                        }

                        return (
                            <Stack key={index} direction="row" spacing={2} alignItems="center">
                                <Box component="img" src={icon} alt="icon" sx={{ width: 40, height: 40 }} />
                                <Stack sx={{ width: "100%" }}>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.h6.fontSize,
                                            color: theme.palette.text.disabled,
                                            p: 1,
                                        }}
                                    >
                                        {label}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.h5.fontSize,
                                            fontWeight: theme.fontWeight.semiBold,
                                            backgroundColor: theme.palette.background.secondary,
                                            borderRadius: theme.customShape.input,
                                            p: 1,
                                            wordBreak: "break-word",
                                            color: value === "N/A" ? theme.palette.primary.main : "inherit",
                                        }}
                                    >
                                        {value}
                                    </Typography>
                                </Stack>
                            </Stack>
                        );
                    })}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default ProfileInfoContainer;
// =========== End ProfileInfoContainer ===========
