// MUI import
import { CardMedia, Typography, Box } from "@mui/material";

// Custom import
import TableCustom from "../../../components/TableCustom";
import FormatYear from "../../../utils/formatDate";
import StatusCode from "../../../assets/images/NoData.svg";
import theme from "../../../assets/themes";

// Api import
import { useFetchEmailEarnerQuery } from "../../../store/api/achievements/achievementApi";

const EarnerList = ({ achievementId }) => {
    const { data: earner } = useFetchEmailEarnerQuery({ achievementId });
    const earnerColumns = [
        {
            name: "ID",
            selector: (row) => row.id || "N/A",
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.User?.username || "N/A",
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.User?.email || "N/A",
            sortable: true,
        },
        {
            name: "Date Of Birth",
            selector: (row) => FormatYear(row.User?.dateOfBirth) || "N/A",
            sortable: true,
        },
        {
            name: "Badge",
            selector: (row) => row.Achievement?.BadgeClass?.name || "N/A",
            sortable: true,
        },
        {
            name: "Academic Year",
            selector: (row) => FormatYear(row.AcademicBackground?.academicYear) || "N/A",
            sortable: true,
        },
        // {
        //     name: "Action",
        //     selector: (row) => (
        //         <MenuSelection onView={() => handleView(row.id)} onDelete={() => handleDelete(row.id)} />
        //     ),
        // },
    ];
    // State for handling selected emails
    const earners = earner?.data.map((earner) => earner?.Earner);
    return earners?.length !== 0 ? (
        <TableCustom title="Earner List" data={earners} columns={earnerColumns}></TableCustom>
    ) : (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={4}
            sx={{
                backgroundColor: theme.palette.customColors.white,
                boxShadow: theme.customShadows.default,
                borderRadius: theme.customShape.card,
            }}
        >
            <Typography variant="h6" mt={2} textAlign="center" color={theme.palette.text.secondary}>
                No Earner Has Invited
            </Typography>
            <CardMedia component="img" image={StatusCode} alt="No badges found" sx={{ maxWidth: 400, width: "100%" }} />
        </Box>
    );
};

export default EarnerList;
