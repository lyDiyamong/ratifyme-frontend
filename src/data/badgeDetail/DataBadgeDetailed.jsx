import React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import theme from "../../assets/themes";
import BadgeTest from "../../assets/images/badgeTest.png";
import issuer from "../../assets/images/AnB.svg"


// Component to render Tags
const Tags = ({ items }) => (
    <Stack  direction="row" flexWrap="wrap">
        {items.map((item) => (
            <Chip  key={item.id} label={item.tags} sx={{ color: theme.palette.customColors.white, bgcolor: theme.palette.primary.main, ml: 0.5, mt: 0.5 }} />
        ))}
    </Stack>
);

// Component to render Attributes
const Attributes = ({ items }) => (
    <Stack direction="row" flexWrap="wrap">
        {items.map((item) => (
            <Chip key={item.id} label={item.tags} sx={{ color: theme.palette.primary.main, ml: 0.5, mt: 0.5 }} variant="outlined" />
        ))}
    </Stack>
);

// Style Alignment for Details
const textAlign = {
    textAlign: "left"
};

// Define DetailData with static data for simplicity
const tags = [
    { id: 1, tags: "Python" },
    { id: 2, tags: "SQL" },
    { id: 3, tags: "Pandas" },
    { id: 4, tags: "Numpy" },
];

const attributes = [
    { id: 1, tags: "Python Exam: 63" },
    { id: 2, tags: "SQL Exam: 72" },
    { id: 3, tags: "Forecasting: 80" },
];

const DetailData = {
    Overview: [
        {
            BagdeImg: BadgeTest,
            BadgeTitle: "Data Analysis, Data Science",
            IssuerLogo: issuer,
            IssuedDate: "Mon 19, Aug 2025",
            Earner: "John Doe"
        }
    ],
    tags, // Reference the tags1 variable
    attributes, // Reference the attributes variable

    items: [
        {
            id: 1,
            Lable: "Description",
            sx: { textAlign },
            Detail: 'This Certification verifies that earners have delved into Data Analysis & Visualization and are familiar with tools and techniques, such as Reporting, Forecasting, Key performance indicators (KPIs) Tableau & PowerBI.'
        },
        {
            id: 2,
            Lable: "Issuer",
            sx: { textAlign, fontWeight: theme.fontWeight.bold },
            Detail: 'Above & Beyond School'
        },
        {
            id: 3,
            Lable: "Criteria",
            sx: { textAlign, fontWeight: theme.fontWeight.bold },
            Detail: 'Data Analysis, Data Science'
        },
        {
            id: 4,
            Lable: "Issued Date",
            sx: { textAlign },
            Detail: 'Mon 19, Aug 2024'
        },
        {
            id: 5,
            Lable: "Badge Expiry Date",
            sx: { textAlign },
            Detail: 'Mon 19, Aug 2025'
        },
        {
            id: 6,
            Lable: "Validation",
            sx: { textAlign },
            Detail: 'Mon 10, Jun 2024 - Wed 10, Jul 2024'
        },
        {
            id: 7,
            Lable: "Duration",
            sx: { textAlign },
            Detail: '30 days'
        },
        {
            id: 8,
            Lable: "Achievement Type",
            sx: { textAlign, fontWeight: theme.fontWeight.bold },
            Detail: 'Certificate'
        },
        {
            id: 9,
            Lable: "Tags",
            sx: { textAlign },
            Detail: 'Python, SQL, Pandas, Numpy',
            ReactCode: <Tags items={tags} />  // Correct usage of Tags component
        },
        {
            id: 10,
            Lable: "Attributes",
            sx: { textAlign },
            Detail: 'Python exam: 63, SQL Exam: 72, Forecasting: 80',
            ReactCode: <Attributes  items={attributes} />  // Correct usage of Attributes component
        },
    ],
};

export { DetailData };
