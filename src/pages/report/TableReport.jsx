// React Library import
import { useSelector } from "react-redux";
import { useState } from "react";

// MUI Import
import { Box, Typography, CircularProgress } from "@mui/material";

// Custom Import
import TableCustom from "../../components/TableCustom";
import  TableAvatars  from "../../components/avartars/TableAvatars";

// Fetching Data Import
import { useFetchInstitutionStatsQuery } from "../../store/api/reports/institutionStatApis";

// ============ Start Table Report ============
const TableReport = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { userId, roleId } = useSelector((state) => state.global);
    const { data: response, isLoading, isError } = useFetchInstitutionStatsQuery();
    const reportData = response?.data;

    // Filter report data based on the user's role
    let filteredReportData;

    if (roleId === 1) {
        // Admin
        filteredReportData = reportData;
    } else if (roleId === 2) {
        // Institution Owner
        filteredReportData = reportData?.filter((report) => report.userId === userId);
    }

    // Filter data based on the search query
    let filteredData = [];
    if (roleId === 1) {
        // Admin sees institution-level data
        filteredData =
            filteredReportData?.filter((report) => {
                const institutionNameMatch = report?.institutionName?.toLowerCase().includes(searchQuery.toLowerCase());
                return institutionNameMatch;
            }) || [];
    } else {
        // Non-admins see issuer-level data, flattening issuers into individual rows
        filteredData =
            filteredReportData
                ?.flatMap((report) =>
                    report.Issuers.map((issuer, index) => ({
                        issuerId: index + 1,
                        issuerName: `${issuer.User.firstName} ${issuer.User.lastName}`,
                        issuerImage: issuer.User.profileImage,
                        issuerEmail: issuer.User.email,
                        totalBadge: issuer.BadgeClasses?.length || 0,
                        totalEarner: issuer.Earners?.length || 0,
                    })),
                )
                .filter((issuer) => {
                    const issuerNameMatch = issuer.issuerName.toLowerCase().includes(searchQuery.toLowerCase());
                    const issuerEmailMatch = issuer.issuerEmail.toLowerCase().includes(searchQuery.toLowerCase());
                    return issuerNameMatch || issuerEmailMatch;
                }) || [];
    }

    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, (currentPage - 1) * rowsPerPage + rowsPerPage);

    // Report Columns based on role
    const reportColumns =
        roleId === 1
            ? [
                  {
                      name: "No.",
                      selector: (row, index) => index + 1 || "N/A",
                      sortable: false,
                  },
                  {
                      name: "Organization Name",
                      selector: (row) => row.institutionName || "N/A",
                      sortable: true,
                      cell: (row) => <TableAvatars profileImage={row.institutionProfileImage} name={row.institutionName} />,
                  },
                  {
                      name: "Total Issuer",
                      selector: (row) => row.Issuers.length || 0,
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
              ]
            : [
                  {
                      name: "Issuer ID",
                      selector: (row, index) => index + 1 || "N/A",
                  },
                  {
                      name: "Issuer Name",
                      selector: (row) => row.issuerName || "N/A",
                      sortable: true,
                      cell: (row) => <TableAvatars profileImage={row.issuerImage} name={row.issuerName} />,
                  },
                  {
                      name: "Issuer Email",
                      selector: (row) => row.issuerEmail,
                      sortable: true,
                  },
                  {
                      name: "Total Badge",
                      selector: (row) => row.totalBadge,
                      sortable: true,
                  },
                  {
                      name: "Total Earner",
                      selector: (row) => row.totalEarner,
                      sortable: true,
                  },
              ];

    return (
        <Box>
            {isLoading ? (
                <CircularProgress />
            ) : isError ? (
                <Typography color="error">Error fetching data</Typography>
            ) : (
                <>
                    <TableCustom
                        title={roleId === 1 ? "Report List" : "Issuer List"}
                        data={paginatedData}
                        columns={reportColumns}
                        onSearch={setSearchQuery}
                        pagination
                        totalRows={filteredData.length}
                        currentPage={currentPage}
                        rowsPerPage={rowsPerPage}
                        onPageChange={setCurrentPage}
                        onRowsPerPageChange={(newRowsPerPage) => {
                            setRowsPerPage(newRowsPerPage);
                            setCurrentPage(1);
                        }}
                    ></TableCustom>
                </>
            )}
        </Box>
    );
};

export default TableReport;
// ============ End Table Report ============
