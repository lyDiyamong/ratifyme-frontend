import React from "react";
import theme from "../../assets/themes";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const Label = {
    tags: [
        {
            id: 1,
            tags: "Python"
        },
        {
            id: 2,
            tags: "Python2"
        },
    ],
    Attribures: [
        {
            id: 1,
            tags: "APython"
        },
        {
            id: 2,
            tags: "APython2"
        },
    ],
}

// Component to render
const Tags12 = ({ items }) => (
    <Stack spacing={1}>
        <Stack direction="row" spacing={1}>
            {items.map((item) => (
                <Chip key={item.id} label={item.tags} color="primary" />
            ))}
        </Stack>
    </Stack>
);

const textAlign = {
    textAlign: "left"
};

const TitleData = {
    items: [
        { id: 1,    title: 'Description' },
        { id: 2,    title: 'Issuer' },
        { id: 3,    title: 'Criteria' },
        { id: 4,    title: 'IssuedDate' },
        { id: 5,    title: 'BadgeExpiryDate' },
        { id: 6,    title: 'Validation' },
        { id: 7,    title: 'Duration' },
        { id: 8,    title: 'AchievementType' },
        { id: 9,    title: 'Tags' },
        { id: 10,   title: 'Attribute' },
    ],
};

const DetailData = {
    items: [
        {   id: 1,
            Lable: "Description",
            sx: {textAlign}, // This will server as Detail Style Snice they have
            Detail: 'This Certificate verifies that earner have delved into Data Analysis & Visualization and are familar with tools and techniques, such as Reporting, Forecasting indecators(KPIs) Tableau & PowerBI'
        },
        {   id: 2,
            Lable: "Issuer",
            sx: {textAlign, fontWeight: theme.fontWeight.bold},
            Detail: 'Above & Beyond School'
        },
        {   id: 3,
            Lable: "Criteria",
            sx: {textAlign, fontWeight: theme.fontWeight.bold},
            Detail: 'Data Analysis, Data Science'
        },
        {   id: 4,
            Lable: "Issued Date",
            sx: {textAlign},
            Detail: 'Mon 19, Aug 2024'
        },
        {   id: 5,
            Lable: "Badge Expiry Date",
            sx: {textAlign},
            Detail: 'Mon 19, Aug 2025'
        },
        {   id: 6,
            Lable: "Validation",
            sx: {textAlign},
            Detail: 'Mon 10, Jun 2024 - Wed 10, Jul 2024'
        },
        {   id: 7,
            Lable: "Duration",
            sx: {textAlign},
            Detail: '30 days'
        },
        {   id: 8,
            Lable: "Achievement Type",
            sx: {textAlign, fontWeight: theme.fontWeight.bold},
            Detail: 'Certificate'
        },
        {   id: 9,
            Lable: "Tags",
            sx: {textAlign},
            Detail: 'Python, SQL, Pandas, Numpy',
            ReactCode: <Tags12 items={Label.tags}/>  // Render component here
        },
        {   id: 10,
            Lable: "Attributes",
            sx: {textAlign},
            Detail: 'Python exam:63, SQL Exam:72, Forecasting:80',
            ReactCode: <Tags12 items={Label.Attribures}/>  // Render component here
        },
    ],
};

export {TitleData, DetailData};
