// React library import
import React from 'react';

// MUI import
import { Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';

// Custom import
import theme from './../assets/themes/index'

// // <!-- ============ Start Action component ============ -->
// function ActionButtons() {
//     // Handle button click and log the action to the console
//     const handleClick = (action) => {
//         console.log(`${action} button clicked`);
//     };
//     // render button
//     return (
//         <Stack direction="row" spacing={2}>
//             <IconButton onClick={() => handleClick('view')} aria-label="view">
//                 <VisibilityIcon sx={{ color: theme.palette.primary.main }} />
//             </IconButton>
//             <IconButton onClick={() => handleClick('delete')} aria-label="delete">
//                 <DeleteForeverIcon sx={{ color: theme.palette.customColors.red400 }} />
//             </IconButton>
//         </Stack>
//     );
// }
// // <!-- ============ End Action component ============ -->

// const columns = [
//     {
//         name: 'ID',
//         selector: row => row.id,
//         sortable: true,
//     },
//     {
//         name: 'Name',
//         selector: row => row.name,
//         sortable: true,
//     },
//     {
//         name: 'Email',
//         selector: row => row.email,
//         sortable: true,
//     },
//     {
//         name: 'Badge',
//         selector: row => row.badge,
//         sortable: true,
//     },
//     {
//         name: 'Year',
//         selector: row => row.year,
//         sortable: true,
//     },
//     {
//         name: 'Position',
//         selector: row => row.position,
//         sortable: true,
//     },
//     {
//         name: 'Action',
//         cell: () => <ActionButtons />, // Render the buttons in the 'Action' column
//     },
// ];

const data = [
    {
        id: 1,
        name: 'Sreypov',
        email: 'Sreypov@tech.com',
        badge: 'FullStack',
        year: '1988',
        position: 'Student',
    },
    {
        id: 2,
        name: 'Bunthong',
        email: 'Bunthong@techa.com',
        badge: 'FullStack',
        year: '1984',
        position: 'Student',
    },
    {
        id: 3,
        name: 'Ratanak',
        email: 'Ratanak@tech.com',
        badge: 'FullStack',
        year: '1984',
        position: 'Student',
    },
    {
        id: 4,
        name: 'Yamong',
        email: 'Yamong@tech.com',
        badge: 'FullStack',
        year: '1984',
        position: 'Student',
    },
    {
        id: 5,
        name: 'Rotha',
        email: 'Rotha@tech.com',
        badge: 'FullStack',
        year: '1984',
        position: 'Student',
    },
    {
        id: 6,
        name: 'Malen',
        email: 'Malen@tech.com',
        badge: 'FullStack',
        year: '1984',
        position: 'Student',
    },
    {
        id: 7,
        name: 'Lyhour',
        email: 'Lyhour@tech.com',
        badge: 'FullStack',
        year: '1984',
        position: 'Student',
    },
    {
        id: 8,
        name: 'Chuuna',
        email: 'Chuuna@tech.com',
        badge: 'FullStack',
        year: '1984',
        position: 'Student',
    },
];

// Export the columns and data
export { data };
