// earnerData.jsx

import React from 'react';
import { Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

function ColorButtons({ onClick }) {
    const theme = useTheme();
  return (
    <Stack direction="row" spacing={2}>
        <IconButton onClick={onClick} aria-label="view">
            <VisibilityIcon sx={{color: theme.palette.primary.main}}/>
        </IconButton>
        <IconButton onClick={onClick} aria-label="delete">
            <DeleteForeverIcon sx={{ color: theme.palette.customColors.red400 }} />
        </IconButton>

    </Stack>
  );
}

const columns = [
	{
		name: 'ID',
		selector: row => row.id,
        sortable: true,
	},
	{
		name: 'Name',
		selector: row => row.name,
        sortable: true,
	},
	{
		name: 'Email',
		selector: row => row.email,
        sortable: true,
	},
	{
		name: 'Badge',
		selector: row => row.badge,
        sortable: true,
	},
	{
		name: 'Year',
		selector: row => row.year,
        sortable: true,
	},
	{
		name: 'Position',
		selector: row => row.position,
        sortable: true,
	},
	{
		name: 'Action',
		cell: () => <ColorButtons />, // Fixed arrow function syntax for rendering the buttons
	},
];

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

];

// Fix the export syntax
export { columns, data };
