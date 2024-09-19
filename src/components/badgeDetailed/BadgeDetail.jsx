// Import React
import React from "react";

// Import MUI
import {Box} from "@mui/material"

// Custom Import
import BadgeOverview from "./Overview";
import BadgeDetailed from "./Detail"

/**
 * DetailedBadge Component
 *
 * A reusable component that displays detailed badge information with optional tabs
 * depending on the user's status. The component conditionally renders the
 * `AdminsDetailed`, `EarnerDatailed` or `IssuerDetailed` components based on the user's `detailedStatus`.
 *
 * Example usage:
 *
 * ```jsx
 *  const status = 'Admin'
 *  const data = DetailData
 *  const btnaction = ""
 *
 *  <Box>
 *
 *      <DetailedBadge status={status} data={DetailData} />
 *  </Box>
 * ```
 * @param {function} btnaction - The action to trigger on button click.
 * @param {string} props.status - The status of the user (e.g., 'Admin', 'Issuer', 'Earner').
 * @param {Object} props.data - The data object containing detailed information for the badge (e.g., badge details, tags, attributes).
 * @returns {JSX.Element} The rendered DetailedBadge component.
 */
const EarnerManagement = ({status,data,btnaction}) => {
    return(
        <Box>
            <BadgeOverview btnstatus={status} btnaction={btnaction} data={data} />
            <BadgeDetailed detailedStatus={status} data={data}/>
        </Box>
)};

export default EarnerManagement;
