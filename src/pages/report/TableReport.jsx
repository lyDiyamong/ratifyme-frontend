// React Library
import { useState } from "react";

// MUI Import
import { Box, Typography, CircularProgress } from "@mui/material";

// Custom Import
import SearchBarCustom from "../../components/SearchBarCustom";
import TableCustom from "../../components/TableCustom";
import NoRecordData from "../../components/NoRecordData";
import ReportChart from "./TableChart";

// Fetching Data Import
import { useFetchInstitutionStatsQuery } from "../../store/api/reports/institutionStatApis";
import { useSelector } from "react-redux";

// ============ Start Table Report ============
const TableReport = () => {
    const { userId, roleId } = useSelector((state) => state.global);
    const { data: response, isLoading, isError } = useFetchInstitutionStatsQuery();
    const reportData = response?.data;

    // State for handling search query
    const [searchQuery, setSearchQuery] = useState("");

    // Filter report data based on the user's role
    let filteredReportData;

    if (roleId === 1) {
        // Admin
        filteredReportData = reportData; // Admin sees all reports
    } else if (roleId === 2) {
        // Institution Owner
        filteredReportData = reportData?.filter((report) => report.userId === userId);
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
                      selector: (row) => row.id || "N/A",
                      sortable: true,
                  },
                  {
                      name: "Organization Name",
                      selector: (row) => row.institutionName || "N/A",
                      sortable: true,
                  },
                  {
                      name: "Total Issuer",
                      selector: (row) => row.Issuers.length || 0,
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
                      selector: (row) => row.Issuers.map((issuer) => issuer.id).join(", ") || "N/A",
                      sortable: true,
                  },
                  {
                      name: "Issuer Name",
                      selector: (row) =>
                          row.Issuers.map((issuer) => `${issuer.User.firstName} ${issuer.User.lastName}`).join(", ") ||
                          "N/A",
                      sortable: true,
                  },
                  {
                      name: "Issuer Email",
                      selector: (row) => row.Issuers.map((issuer) => issuer.User.email) || "N/A",
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
                <>
                    <ReportChart />
                    <TableCustom title="Report List" data={filteredData} columns={reportColumns} />
                </>
            ) : (
                // Display this section if no report matches the search query
                <NoRecordData />
            )}
        </Box>
    );
};

export default TableReport;
// ============ End Table Report ============
