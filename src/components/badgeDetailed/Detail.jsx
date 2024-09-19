import React from 'react';
import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';

import BadgeDetail from './CompoBadgeDetail';
import DashboardContainer from '../styles/DashboardContainer';


const AdminsDetailed = ({data}) => {
    return (
        <DashboardContainer sx={{py: 1.5}}>
            <BadgeDetail data={data}/>
        </DashboardContainer>
    )
}

const IssuerDetailed =({data}) => {
    return (
        <DashboardContainer sx={{py: 1.5}}>
            <Tabs defaultValue={1}>
            <TabsList>
                <Tab value={1}>Description</Tab>
                <Tab value={2}>Earner List</Tab>

            </TabsList>
            <TabPanel value={1}>
                <BadgeDetail data={data}/>
            </TabPanel>
            <TabPanel value={2}>Second page</TabPanel>

            </Tabs>
        </DashboardContainer>
    );
}

/**
 * DetailedBadge Component
 *
 * A reusable component that displays detailed badge information with optional tabs
 * depending on the user's status. The component conditionally renders the
 * `AdminsDetailed` or `IssuerDetailed` components based on the user's `detailedStatus`.
 *
 * Example usage:
 *
 * ```jsx
 *  const status = 'Earner'
 *  const data =
 *  <Box>
 *      <BadgeOverview btnstatus={status} btnaction="" data={DetailData} />
 *      <DetailedBadge detailedStatus={status} data={DetailData} />
 *  </Box>
 * ```
 *
 * @param {string} props.detailedStatus - The status of the user (e.g., 'Admin', 'Issuer', 'Earner').
 * @param {Object} props.data - The data object containing detailed information for the badge (e.g., badge details, tags, attributes).
 * @returns {JSX.Element} The rendered DetailedBadge component.
 */
const Detailed = ({detailedStatus,data}) => {
    if (detailedStatus === 'Admin' || detailedStatus === 'Earner') {
        return <AdminsDetailed data={data}/>
    } else if (detailedStatus === 'Issuer') {
        return <IssuerDetailed data={data} />
    } else {
        return (
            <DashboardContainer sx={{py: 1.5}}>
                <p>Invalid status</p>
            </DashboardContainer>


    )}
}

const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#80BFFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

const Tab = styled(BaseTab)`
font-family: 'IBM Plex Sans', sans-serif;
color: black;
cursor: pointer;
font-size: 0.875rem;
font-weight: bold;
background-color: transparent;
width: 100%;
maxWidth: "1600px";
line-height: 1.5;
padding: 8px 12px;
margin: 6px;
border: none;
border-radius: 8px;
display: flex;
justify-content: center;

&:hover {
    background-color: ${blue[50]};
}

&:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
}

&.${tabClasses.selected} {
    background-color: ${blue[100]};
    color: black;
}

&.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
}
`;

const TabPanel = styled(BaseTabPanel)`
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
`;

const TabsList = styled(BaseTabsList)(
    ({ theme }) => `
    min-width: 200px;
    background-color: white;
    border-radius: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    box-shadow: 0px 4px 6px ${
        theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.4)' : 'rgba(0,0,0, 0.2)'
    };
`,
);

export default Detailed