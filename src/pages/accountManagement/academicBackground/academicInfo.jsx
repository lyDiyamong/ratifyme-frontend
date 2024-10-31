import { useState } from "react";
import { Box, Card, CardContent, Stack, Typography, IconButton, Divider, useMediaQuery } from "@mui/material";
import { AccessTime, AccountBalanceRounded, BorderColorRounded, Delete, DeleteForeverOutlined, School } from "@mui/icons-material";
import theme from "../../../assets/themes";
import MoreMenu from "../../../components/MoreMenu";
import EditAcademicModal from "./EditAcademicModal";
import dayjs from "dayjs";
import { useDeleteAcademicBackgroundByIdMutation } from "../../../store/api/earnerManagement/earnerApis";
import useCatchStatus from "../../../hooks/useCatchStatus";
import AlertMessage from "../../../components/alert/AlertMessage";
import AlertConfirmation from "../../../components/alert/AlertConfirmation";

const AcademicInfo = ({ academicData }) => {
    const { userId, fieldOfStudyId, academicYear, academicLevelId, academicId } = academicData;
    const [deleteAcademicBackground, { isSuccess, isError }] = useDeleteAcademicBackgroundByIdMutation();
    const [open, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
     const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [message, setMessage] = useCatchStatus(isSuccess || isError, isSuccess ? "Deleted successfully" : "Deleted failed");

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

    const handleDelete = async (id) => {
        try {
            await deleteAcademicBackground({ id });
        } catch (error) {
            setMessage("Deleted failed");
        } finally {
            setOpen(false);
        }
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
            onClick: () => setIsDeleteModal(true),
        },
    ];
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
        <AlertConfirmation
                open={isDeleteModal}
                title="Delete this Academic Background"
                message="Are you sure you want to delete this? This action cannot be undone."
                onClose={() => setIsDeleteModal(false)}
                onConfirm={() => handleDelete(academicId)}
                confirmText="Delete"
                cancelText="Cancel"
                iconColor={theme.palette.error.main}
                iconBgColor={theme.palette.customColors.red100}
                confirmButtonColor={theme.palette.customColors.red300}
                icon={DeleteForeverOutlined}
            />
            {/* Delete confirm modal */}
            {message && (
                <AlertMessage variant={isSuccess ? "success" : "error"} onClose={() => setMessage("")}>
                    {message}
                </AlertMessage>
            )}
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

            <EditAcademicModal open={open} onClose={handleClose} initialData={selectedData} academicId={academicId} />
        </>
    );
};

export default AcademicInfo;
