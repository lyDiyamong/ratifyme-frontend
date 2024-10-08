// import { Box, Stack, Typography } from "@mui/material";
// import FormatDate from "../../../utils/formatDate";
// import theme from "../../../assets/themes";
// import formatPhoneNumber from "../../../utils/formatPhoneNumber";
// import { useSelector } from "react-redux";

// /**
//  * ProfileInfo Component
//  *
//  * This component dynamically renders profile information based on the provided `profileData` prop.
//  * It allows changing the icons and data depending on the user's role or other factors.
//  *
//  * @param {Array} details - An array of detail objects, where each object contains an icon, title, and value for displaying additional profile information.
//  *
//  * @returns {JSX.Element} A responsive stack displaying profile information.
//  */

// // Utility function to get value from nested objects based on a string key path
// const getValue = (obj, keyPath) => {
//     if (!keyPath || typeof keyPath !== "string") {
//         return "N/A"; // Default value if keyPath is undefined
//     }

//     return keyPath.split(".").reduce((o, k) => (o || {})[k], obj);
// };

// const ProfileInfo = ({ details, item }) => {
//     const { addressData } = useSelector((state) => state.global);
//     const countryCode = addressData?.country || "N/A";

//     return (
//         <Stack mt={5} spacing={3} justifyContent="start" width="100%">
//             {details.map(({ icon, label, valueKey }, index) => {
//                 let value = getValue(item, valueKey) || "N/A";

//                 // Format value based on specific labels
//                 if (label === "Date of Birth" || label === "Plan expired Date") {
//                     value = FormatDate(value);
//                 } else if (label === "Phone") {
//                     value = formatPhoneNumber(value);
//                 }

//                 return (
//                     <Stack key={index} direction="row" spacing={2} alignItems="center" sx={{ marginBottom: "16px" }}>
//                         <Box component="img" src={icon} alt="icon" sx={{ width: 40, height: 40 }} />
//                         <Stack sx={{ width: "100%" }}>
//                             <Typography
//                                 sx={{
//                                     fontSize: theme.typography.h6.fontSize,
//                                     color: theme.palette.text.disabled,
//                                     p: 1,
//                                 }}
//                             >
//                                 {label}
//                             </Typography>
//                             <Typography
//                                 sx={{
//                                     fontSize: theme.typography.h5.fontSize,
//                                     fontWeight: theme.fontWeight.semiBold,
//                                     backgroundColor: theme.palette.background.secondary,
//                                     borderRadius: theme.customShape.input,
//                                     p: 1,
//                                     wordBreak: "break-word",
//                                     color: value === "N/A" ? theme.palette.primary.main : "inherit",
//                                 }}
//                             >
//                                 {value}
//                             </Typography>
//                         </Stack>
//                     </Stack>
//                 );
//             })}
//         </Stack>
//     );
// };

// export default ProfileInfo;

import { Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useFetchInfoUserByIdQuery } from "../../../store/api/users/userInfoProfileApi";
import FormatDate from "../../../utils/formatDate";
import formatPhoneNumber from "../../../utils/formatPhoneNumber";
import theme from "../../../assets/themes/index";
import BirthDateIcon from "../../../assets/icons/DateOfBirth.svg";
import EmailIcon from "../../../assets/icons/Email.svg";
import OrganizationIcon from "../../../assets/icons/Organization.svg";
import PhoneIcon from "../../../assets/icons/Phone.svg";
import GenderIcon from "../../../assets/icons/Gender.svg";
import EducationIcon from "../../../assets/icons/Education.svg";
import Link from "../../../assets/icons/Link.svg";

// Profile info configuration directly in this file
const profileInfoConfig = {
    admin: [
        { icon: PhoneIcon, label: "Phone", valueKey: "phoneNumber" },
        { icon: EmailIcon, label: "Email", valueKey: "email" },
        { icon: BirthDateIcon, label: "Date of Birth", valueKey: "dateOfBirth" },
    ],
    institutionOwner: [
        { icon: PhoneIcon, label: "Phone", valueKey: "phoneNumber" },
        { icon: EmailIcon, label: "Email", valueKey: "email" },
        { icon: BirthDateIcon, label: "Date of Birth", valueKey: "dateOfBirth" },
        { icon: OrganizationIcon, label: "Organization", valueKey: "Organization" },
        { icon: Link, label: "Link", valueKey: "intitutionLink" },
    ],
    issuer: [
        { icon: PhoneIcon, label: "Phone", valueKey: "phoneNumber" },
        { icon: EmailIcon, label: "Email", valueKey: "email" },
        { icon: BirthDateIcon, label: "Date of Birth", valueKey: "dateOfBirth" },
        { icon: GenderIcon, label: "Gender", valueKey: "Gender.name" },
        { icon: OrganizationIcon, label: "Organization", valueKey: "Organization" },
        { icon: Link, label: "Link", valueKey: "intitutionLink" },
    ],
    earner: [
        { icon: PhoneIcon, label: "Phone", valueKey: "phoneNumber" },
        { icon: EmailIcon, label: "Email", valueKey: "email" },
        { icon: BirthDateIcon, label: "Date of Birth", valueKey: "dateOfBirth" },
        { icon: GenderIcon, label: "Gender", valueKey: "Gender.name" },
        { icon: EducationIcon, label: "Education", valueKey: "AcademicBackground.Institution.name" },
    ],
};

// Utility function to get value from nested objects based on a string key path
const getValue = (obj, keyPath) => {
    if (!keyPath || typeof keyPath !== "string") {
        return "N/A";
    }
    return keyPath.split(".").reduce((o, k) => (o || {})[k], obj);
};

const ProfileInfoContainer = () => {
    const { userId } = useSelector((state) => state.global);
    const { data: info, isLoading } = useFetchInfoUserByIdQuery(userId, { skip: !userId });
    const userData = info?.data;

    if (isLoading) {
        return <Typography>Loading...</Typography>; // Handle loading state
    }

    const roleName = userData?.Role?.name;
    const details = profileInfoConfig[roleName] || [{ label: "No data available for this role" }];

    return (
        <Stack mt={5} spacing={3} justifyContent="start" width="100%">
            {details.map(({ icon, label, valueKey }, index) => {
                let value = getValue(userData, valueKey) || "N/A";

                // Format value based on specific labels
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
    );
};

export default ProfileInfoContainer;

