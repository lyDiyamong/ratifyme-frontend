// MUI Import
import { Box, Typography, CircularProgress } from "@mui/material";

// Custom Import
// import SearchBar from "../../components/SearchBarCustom";
import TableCustom from "../../components/TableList";
import FormatYear from "../../utils/formatDate";

// Fetching Data Import
import { useFetchInstitutionStatsQuery } from "../../store/api/reports/institutionStatApis";

// ============ Start Table Report ============
const TableReport = () => {
    const { data: response, isLoading, isError } = useFetchInstitutionStatsQuery();
    const badgeData = response?.data;

    // Institution Columns
    const badgeColumns = [
        {
            name: "Organization",
            selector: (row) => row.name,
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
                row.Issuers.reduce((totalBadges, issuer) => 
                    totalBadges + (issuer.BadgeClasses?.length || 0), 0),
            sortable: true,
        },
        {
            name: "Total Earner",
            selector: (row) => 
                row.Issuers.reduce((totalEarners, issuer) => 
                    totalEarners + (issuer.Earners?.length || 0), 0),
            sortable: true,
        },
        {
            name: "Expire Date",
            selector: (row) => {
                const latestBadge = row.Issuers
                    .flatMap((issuer) => issuer.BadgeClasses)
                    .reduce((latest, badge) => {
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

    return (
        <Box>
            {/* Table Data Rendering */}
            {isLoading ? (
                <CircularProgress />
            ) : isError ? (
                <Typography color="error">Error fetching data</Typography>
            ) : (
                <TableCustom title="Badge List" data={badgeData} columns={badgeColumns} />
            )}
        </Box>
    );
};

export default TableReport;
