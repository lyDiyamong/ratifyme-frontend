// React Library import
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

// MUI Import
import { Box, Typography, CircularProgress } from "@mui/material";

// Custom Import
import TableCustom from "../../components/TableCustom";
import InviteUserModal from "../../components/modals/InviteUserModal";
import { useFetchInstitutionStatsQuery } from "../../store/api/reports/institutionStatApis";
import { useInviteIssuerMutation, useFetchAllInvitedUserQuery } from "../../store/api/userManagement/inviteUserApi";

// ============ Start Table Issuer Modal ============
const TableIssuer = () => {
    // State for controlling dialog
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Global state for user info and institution info
    const { userId, roleId, institutionData } = useSelector((state) => state.global);
    const institutionId = institutionData?.id;

    // API Queries
    const { data: response, isLoading, isError } = useFetchInstitutionStatsQuery();
    const { data: invitedUserData } = useFetchAllInvitedUserQuery();
    const [inviteIssuer] = useInviteIssuerMutation();

    // Local State for invited users
    const [invitedIssuers, setInvitedIssuers] = useState([]);

    // Load and filter invited users on mount
    useEffect(() => {
        if (invitedUserData && institutionData?.code) {
            const filteredIssuers =
                invitedUserData.data?.filter(
                    (user) => user.roleId === 3 && user.inviterCode === institutionData.code,
                ) || [];

            const sortedIssuers = filteredIssuers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setInvitedIssuers(sortedIssuers);
        }
    }, [invitedUserData, institutionData]);

    // Filter Issuer Data based on role
    const filterIssuerData = (issuerData) => {
        if (roleId === 1) return issuerData; // Admin can see all issuers
        return issuerData?.filter((issuer) => issuer.userId === userId); // Other roles see their own issuers
    };

    // Flatten data to render issuers
    const flattenData = (filteredIssuerData) => {
        return filteredIssuerData?.flatMap((institution) =>
            institution.Issuers.map((issuer) => ({
                institutionName: institution.institutionName,
                issuerId: issuer.id,
                issuerName: `${issuer.User.firstName} ${issuer.User.lastName}`,
                issuerEmail: issuer.User.email,
                totalBadges: issuer.BadgeClasses?.length || 0,
                totalEarners: issuer.Earners?.length || 0,
            })),
        );
    };

    // Handle closing the invite issuer dialog
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    // Handle inviting a new issuer
    const handleInviteSubmit = async (data, reset) => {
        try {
            // Send invitation via API
            const newIssuer = await inviteIssuer({ institutionId, email: data.email }).unwrap();

            // Update local state with the new invited issuer
            setInvitedIssuers((prev) =>
                [
                    {
                        inviteEmail: newIssuer.inviteEmail || data.email,
                        status: false,
                        createdAt: new Date().toISOString(),
                    },
                    ...prev,
                ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
            );

            reset(); // Reset the form
            setDialogOpen(false); // Close the dialog on success
        } catch (error) {
            console.error("Error sending invitation", error);
        }
    };

    // Filter based on search query for organization and issuer name
    const searchFilteredData = (flattenedData) => {
        return (
            flattenedData?.filter((issuer) => {
                const organizationMatch = issuer.institutionName?.toLowerCase().includes(searchQuery.toLowerCase());
                const issuerMatch = issuer.issuerName?.toLowerCase().includes(searchQuery.toLowerCase());
                return organizationMatch || issuerMatch;
            }) || []
        );
    };

    // Issuer Columns based on role
    const getIssuerColumns = () => {
        const commonColumns = [
            { name: "Issuer Name", selector: (row) => row.issuerName || "N/A", sortable: true },
            { name: "Issuer Email", selector: (row) => row.issuerEmail || "N/A", sortable: true },
            { name: "Total Badge", selector: (row) => row.totalBadges, sortable: true },
            { name: "Total Earner", selector: (row) => row.totalEarners, sortable: true },
        ];

        // Admin has additional organization name column
        if (roleId === 1) {
            return [
                { name: "No. ", selector: (row, index) => index + 1 || "N/A" },
                { name: "Organization Name", selector: (row) => row.institutionName || "N/A", sortable: true },
                ...commonColumns,
            ];
        }
        if (roleId === 2) {
            return [
                { name: "No. ", selector: (row, index) => index + 1 || "N/A" },
                ...commonColumns,
            ];
        }
        return commonColumns;
    };

    // Flatten and filter data
    const filteredIssuerData = filterIssuerData(response?.data);
    const flattenedData = flattenData(filteredIssuerData);
    const filteredData = searchFilteredData(flattenedData);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        (currentPage - 1) * rowsPerPage + rowsPerPage
    );
    // Render Component
    return (
        <Box>
            {isLoading ? (
                <CircularProgress />
            ) : isError ? (
                <Typography color="error">Error fetching data</Typography>
            ) : (
                <TableCustom
                    title="Issuer List"
                    // data={filteredData}
                    data={paginatedData}
                    columns={getIssuerColumns()}
                    onSearch={setSearchQuery}
                    addNewBtn={true} 
                    onAddNew={() => setDialogOpen(true)}
                    pagination
                    totalRows={filteredData.length}
                    currentPage={currentPage} 
                    rowsPerPage={rowsPerPage} 
                    onPageChange={setCurrentPage} 
                    onRowsPerPageChange={(newRowsPerPage) => {
                        setRowsPerPage(newRowsPerPage);
                        setCurrentPage(1); 
                    }} 
                >
                </TableCustom>
            )}

            {/* Invite Issuer Modal */}
            <InviteUserModal
                open={dialogOpen}
                handleClose={handleCloseDialog}
                onSubmit={handleInviteSubmit}
                invitedUsers={invitedIssuers}
            />
        </Box>
    );
};

export default TableIssuer;
// ============ End Table Issuer Modal ============
