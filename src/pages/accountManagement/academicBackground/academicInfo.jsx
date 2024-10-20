import { useState } from "react";
import { Box, Card, CardContent, Stack, Typography, IconButton, Divider, useMediaQuery } from "@mui/material";
import { AccessTime, AccountBalanceRounded, BorderColorRounded, Delete, School } from "@mui/icons-material";
import theme from "../../../assets/themes";
import MoreMenu from "../../../components/MoreMenu";
import EditAcademicModal from "./EditAcademicModal";
import dayjs from "dayjs";
import { useDeleteAcademicBackgroundByIdMutation } from "../../../store/api/earnerManagement/earnerApis";

const AcademicInfo = ({ academicData }) => {
    const { userId, fieldOfStudyId, academicYear, academicLevelId } = academicData;
    const [deleteAcademicBackground] = useDeleteAcademicBackgroundByIdMutation();
    const [open, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const handleOpen = () => {
        setSelectedData({
            fieldOfStudyId,
            academicYear: academicYear ? dayjs(academicYear) : null,
            academicLevelId,
            userId,
        });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleDelete = (id) => {
        deleteAcademicBackground(id)
            .then(() => {})
            .catch((error) => {
                console.error("Error deleting academic background:", error);
            });
    };

    const menuItems = [
        {
            label: "Update",
            icon: <BorderColorRounded color="primary" />,
            onClick: handleOpen,
        },
        {
            label: "Delete",
            icon: <Delete color="error" />,
            onClick: () => handleDelete(academicData.userId),
        },
    ];
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            <Card
                sx={{
                    boxShadow: theme.customShadows.default,
                    display: { md: "flex", xss: "block" },
                    padding: 2,
                    width: "100%",
                    alignItems: "center",
                }}
            >
                <Box sx={{ minWidth: 80, textAlign: "center" }}>
                    <Typography variant="h6" color="error" fontWeight="bold">
                        {dayjs(academicYear).format("ddd")}
                    </Typography>
                    <Typography variant="h4" color={theme.palette.text.primary}>
                        {dayjs(academicYear).date()}
                    </Typography>
                    <Typography variant="h6" color={theme.palette.text.main}>
                        {dayjs(academicYear).format("MMM YYYY")}
                    </Typography>
                </Box>

                <Divider
                    orientation={isSmallScreen ? "horizontal" : "vertical"}
                    sx={{
                        borderColor: theme.palette.grey[300],
                        height: { md: "100px", xss: 0 },
                        mx: 2,
                        my: { md: 0, xss: 2 },
                    }}
                />

                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AccessTime fontSize="small" color="action" />
                        <Typography variant="body2" color="textSecondary">
                            {academicYear}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <School fontSize="small" color="action" />
                        <Typography variant="body2" color="textSecondary">
                            {academicLevelId}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AccountBalanceRounded fontSize="small" color="action" />
                        <Typography variant="body2" color="textSecondary">
                            {fieldOfStudyId}
                        </Typography>
                    </Stack>
                </CardContent>

                <Stack alignItems={{ md: "start", xss: "end" }}>
                    <IconButton>
                        <MoreMenu
                            menuItems={menuItems}
                            iconStyles={{
                                color: theme.palette.text.secondary,
                            }}
                        />
                    </IconButton>
                </Stack>
            </Card>

            <EditAcademicModal open={open} onClose={handleClose} initialData={selectedData} userId={userId} />
        </>
    );
};

export default AcademicInfo;
