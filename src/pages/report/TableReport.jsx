// React Library
import { useState } from "react";

// MUI Import
import { Box, Typography, CircularProgress } from "@mui/material";

// Custom Import
import SearchBarCustom from "../../components/SearchBarCustom";
import TableCustom from "../../components/TableList";
import FormatYear from "../../utils/formatDate";
import NoRecordData from "../../components/NoRecordData";
// Fetching Data Import
import { useFetchInstitutionStatsQuery } from "../../store/api/reports/institutionStatApis";

// ============ Start Table Report ============
const TableReport = () => {
    const { data: response, isLoading, isError } = useFetchInstitutionStatsQuery();
    const reportData = response?.data;

    //Search query state for filtering report data
    const [searchQuery, setSearchQuery] = useState("");

    // Institution Columns
    const reportColumns = [
        {
            name: "Organization",
            selector: (row) => row.institutionName,
            sortable: true,
        },
        {
            name: "Total Issuer",
            selector: (row) => row.Issuers.length,
            sortable: true,
        },
        {
            name: "Total Badge",
            selector: (row) =>
                row.Issuers.reduce((totalBadges, issuer) => totalBadges + (issuer.BadgeClasses?.length || 0), 0),
            sortable: true,
        },
        {
            name: "Total Earner",
            selector: (row) =>
                row.Issuers.reduce((totalEarners, issuer) => totalEarners + (issuer.Earners?.length || 0), 0),
            sortable: true,
        },
        {
            name: "Expire Date",
            selector: (row) => {
                const latestBadge = row.Issuers.flatMap((issuer) => issuer.BadgeClasses).reduce((latest, badge) => {
                    if (!latest || new Date(badge.expiredDate) > new Date(latest.expiredDate)) {
                        return badge;
                    }
                    return latest;
                }, null);

                return latestBadge ? FormatYear({ dateString: latestBadge.expiredDate }) : "N/A";
            },
            sortable: true,
        },
    ];

    //FilterReport Data = reportData?.

    const filterReportData = reportData?.filter((report) =>
        report.institutionName.toLowerCase().includes(searchQuery),
    );

    return (
        <Box>
            {/* Search bar */}
            <SearchBarCustom onSearch={setSearchQuery} />
            {/* Table Data Rendering */}
            {isLoading ? (
                <CircularProgress />
            ) : isError ? (
                <Typography color="error">Error fetching data</Typography>
            ) : filterReportData && filterReportData.length > 0 ? (
                <TableCustom title="Report List" data={filterReportData} columns={reportColumns} />
            ) : (
                // Display this section if no report match the search query
                <NoRecordData />
            )}
        </Box>
    );
};

export default TableReport;
