// MUI Import
import { Box, Typography, CircularProgress } from "@mui/material";

// Custom Import
import TableCustom from "../../components/TableCustom";
import NoRecordData from "../../components/NoRecordData";

// Fetching Data Import
import { useFetchInstitutionStatsQuery } from "../../store/api/reports/institutionStatApis";
import { useSelector } from "react-redux";

// =========== Start Table Issuer ===========
const TableIssuer = ({ searchQuery }) => {
    const { userId, roleId } = useSelector((state) => state.global);
    const { data: response, isLoading, isError } = useFetchInstitutionStatsQuery();

    const issuerData = response?.data;

    // Filter Issuer Data
    let filteredIssuerData;

    if (roleId === 1) {
        filteredIssuerData = issuerData;
    } else if (roleId === 2) {
        filteredIssuerData = issuerData?.filter((issuer) => issuer.userId === userId);
    }

    // Flatten the data so that each issuer appears in its own row
    const flattenedData = filteredIssuerData?.flatMap((institution) =>
        institution.Issuers.map((issuer) => ({
            institutionName: institution.institutionName,
            issuerId: issuer.id,
            issuerName: `${issuer.User.firstName} ${issuer.User.lastName}`,
            issuerEmail: issuer.User.email,
            totalBadges: issuer.BadgeClasses?.length || 0,
            totalEarners: issuer.Earners?.length || 0,
        }))
    );

    // Filter based on search query for both organization name and issuer name
    const filteredData =
        flattenedData?.filter((issuer) => {
            const organizationMatch = issuer.institutionName?.toLowerCase().includes(searchQuery.toLowerCase());
            const issuerMatch = issuer.issuerName?.toLowerCase().includes(searchQuery.toLowerCase());
            return organizationMatch || issuerMatch;
        }) || [];

    // Issuer Columns
    const issuerColumns =
        roleId === 1
            ? [
                  {
                      name: "Organization Name",
                      selector: (row) => row.institutionName || "N/A",
                      sortable: true,
                  },
                  {
                      name: "Issuer ID",
                      selector: (row) => row.issuerId || "N/A",
                      sortable: true,
                  },
                  {
                      name: "Issuer Name",
                      selector: (row) => row.issuerName || "N/A",
                      sortable: true,
                  },
                  {
                      name: "Issuer Email",
                      selector: (row) => row.issuerEmail || "N/A",
                      sortable: true,
                  },
                  {
                      name: "Total Badge",
                      selector: (row) => row.totalBadges,
                      sortable: true,
                  },
                  {
                      name: "Total Earner",
                      selector: (row) => row.totalEarners,
                      sortable: true,
                  },
              ]
            : [
                  {
                      name: "Issuer ID",
                      selector: (row) => row.issuerId || "N/A",
                      sortable: true,
                  },
                  {
                      name: "Issuer Name",
                      selector: (row) => row.issuerName || "N/A",
                      sortable: true,
                  },
                  {
                      name: "Issuer Email",
                      selector: (row) => row.issuerEmail || "N/A",
                      sortable: true,
                  },
                  {
                      name: "Total Badge",
                      selector: (row) => row.totalBadges,
                      sortable: true,
                  },
                  {
                      name: "Total Earner",
                      selector: (row) => row.totalEarners,
                      sortable: true,
                  },
              ];

    return (
        <Box>
            {isLoading ? (
                <CircularProgress />
            ) : isError ? (
                <Typography color="error">Error fetching data</Typography>
            ) : filteredData.length > 0 ? (
                <TableCustom title="Issuer List" data={filteredData} columns={issuerColumns} />
            ) : (
                <NoRecordData />
            )}
        </Box>
    );
};

export default TableIssuer;
// =========== End Table Issuer ===========
