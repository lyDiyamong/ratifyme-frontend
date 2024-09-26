// React Library
import { useState } from "react";

// MUI Import
import { Box, Typography, CircularProgress } from "@mui/material";

// Custom Import
import SearchBarCustom from "../../components/SearchBarCustom";
import TableCustom from "../../components/TableList";
import NoRecordData from "../../components/NoRecordData";

// Fetching Data Import
import { useFetchInstitutionStatsQuery } from "../../store/api/reports/institutionStatApis";
import { useCheckAuthQuery } from "../../store/api/auth/authApi";

// ============ Start Table Report ============
const TableReport = () => {
    const { data: user } = useCheckAuthQuery();
    const { data: response, isLoading, isError } = useFetchInstitutionStatsQuery();
    const reportData = response?.data;

    // State for handling search query
    const [searchQuery, setSearchQuery] = useState("");

    // Check the user's role
    const roleId = user?.user?.roleId;
    const userID = user?.user?.id;

    // Filter report data based on the user's role
    let filteredReportData;

    if (roleId === 1) {
        // Admin
        filteredReportData = reportData; // Admin sees all reports
    } else if (roleId === 2) {
        // Institution Owner
        filteredReportData = reportData?.filter((report) => report.userId === userID);
    }

    // Filter data based on the search query
    const filteredData =
        filteredReportData?.filter((report) =>
            report?.institutionName?.toLowerCase().includes(searchQuery.toLowerCase()),
        ) || [];

    // Report Columns
    const reportColumns =
        roleId === 1
            ? [
                  {
                      name: "ID",
                      selector: (row) => row.id,
                      sortable: true,
                  },
                  {
                      name: "Organization Name",
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
                          row.Issuers.reduce(
                              (totalBadges, issuer) => totalBadges + (issuer.BadgeClasses?.length || 0),
                              0,
                          ),
                      sortable: true,
                  },
                  {
                      name: "Total Earner",
                      selector: (row) =>
                          row.Issuers.reduce((totalEarners, issuer) => totalEarners + (issuer.Earners?.length || 0), 0),
                      sortable: true,
                  },
              ]
            : [
                  {
                      name: "Issuer ID",
                      selector: (row) => row.Issuers.map((issuer) => issuer.id).join(", "),
                      sortable: true,
                  },
                  {
                      name: "Issuer Name",
                      selector: (row) =>
                          row.Issuers.map((issuer) => `${issuer.User.firstName} ${issuer.User.lastName}`).join(", "),
                      sortable: true,
                  },
                  {
                      name: "Issuer Email",
                      selector: (row) => row.Issuers.map((issuer) => issuer.User.email),
                      sortable: true,
                  },
                  {
                      name: "Total Badge",
                      selector: (row) =>
                          row.Issuers.reduce(
                              (totalBadges, issuer) => totalBadges + (issuer.BadgeClasses?.length || 0),
                              0,
                          ),
                      sortable: true,
                  },
                  {
                      name: "Total Earner",
                      selector: (row) =>
                          row.Issuers.reduce((totalEarners, issuer) => totalEarners + (issuer.Earners?.length || 0), 0),
                      sortable: true,
                  },
              ];

    return (
        <Box>
            <SearchBarCustom onSearch={setSearchQuery} />
            {isLoading ? (
                <CircularProgress />
            ) : isError ? (
                <Typography color="error">Error fetching data</Typography>
            ) : filteredData.length > 0 ? (
                <TableCustom title="Report List" data={filteredData} columns={reportColumns} />
            ) : (
                // Display this section if no report matches the search query
                <NoRecordData />
            )}
        </Box>
    );
};

export default TableReport;
// ============ End Table Report ============
