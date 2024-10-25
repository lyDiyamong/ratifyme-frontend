// React library import
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// MUI imports
import { Box, Typography, Button, SvgIcon, Stack } from "@mui/material";
import { PasswordOutlined, NorthEast, Business } from "@mui/icons-material";


const CodeInvitationCard = () => {
    const { roleId, institutionData, issuerData, userInfo, earnerData } = useSelector((state) => state.global);
    let position = userInfo?.Role?.name;

    if (position === "institutionOwner") {
        position = "Institution owner";
    }

    return (
        <Stack
            sx={{
                fontFamily: "Arial, sans-serif",
                width: "100%",
                padding: "38px",
                height: "240px",
                borderRadius: "24px",
                background: "linear-gradient(to bottom right, #1560bd, #73C2FB)",
                boxShadow: `
          0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05)
        `,
                position: "relative",
                overflow: "hidden",
                color: "white",
            }}
            justifyContent="center"
        >
            {/* Circles for background styling */}
            <Box
                sx={{
                    position: "absolute",
                    top: "-80px",
                    right: "-80px",
                    width: "160px",
                    height: "160px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    zIndex: 1,
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: "-64px",
                    left: "-64px",
                    width: "128px",
                    height: "128px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    zIndex: 1,
                }}
            />

            {/* Card Content */}
            <Stack spacing={1} zIndex={2} position="relative">
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h2" fontWeight="bold" className="card-title">
                        {roleId === 1
                            ? "Ratifyme"
                            : roleId === 3
                            ? issuerData?.Institution?.institutionName
                            : institutionData?.institutionName || earnerData?.Issuer?.Institution?.institutionName}
                    </Typography>
                    <SvgIcon
                        component={PasswordOutlined}
                        sx={{
                            width: "40px",
                            height: "40px",
                            opacity: 0.5,
                        }}
                    />
                </Stack>

                <>
                    {roleId !== 1 && (
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ fontSize: 14 }}>
                            <Typography>{roleId === 3 ? "Your Code (Issuer): " : "Organization Code: "}</Typography>
                            <Typography variant="h3" fontWeight="bold" letterSpacing={2}>
                                {roleId === 3 ? issuerData?.code : institutionData?.code || earnerData?.Issuer?.Institution?.code}
                            </Typography>
                        </Stack>
                    )}

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ fontSize: 14 }}>
                        <Typography>Position: </Typography>
                        <Typography variant="h6" fontWeight="bold">
                            {position}
                        </Typography>
                    </Stack>
                </>

                {/* Buttons */}
                <Stack direction={{ xss: "column", sm: "row" }} spacing={2}>
                    {(roleId === 2 || roleId === 3) && (
                        <Box width={"100%"}>
                            <Link to="/dashboard/management/issuers">
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#3b82f6",
                                        backgroundColor: "rgb(253, 253, 253)",
                                        padding: "8px",
                                        borderRadius: "12px",
                                        transition: "transform 0.3s, box-shadow 0.3s",
                                        textTransform: "none",
                                        width: "100%",
                                        "&:hover": {
                                            transform: "translateY(-2px)",
                                            boxShadow: `
                  0 4px 6px -1px rgba(0, 0, 0, 0.1),
                  0 2px 4px -1px rgba(0, 0, 0, 0.06)
                `,
                                        },
                                    }}
                                >
                                    <SvgIcon
                                        component={NorthEast}
                                        sx={{ marginRight: "8px", display: { xss: "none", xs: "flex" } }}
                                    />
                                    {roleId === 2 ? 'Invite Issuer' : 'Invite Earner'}
                                </Button>
                            </Link>
                        </Box>
                    )}

                    <Box width={"100%"}>
                        <Link to="/dashboard/setting/account">
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    backgroundColor: "#007FFF",
                                    padding: "8px",
                                    borderRadius: "12px",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    width: "100%",
                                    textTransform: "none",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: `
                  0 4px 6px -1px rgba(0, 0, 0, 0.1),
                  0 2px 4px -1px rgba(0, 0, 0, 0.06)
                `,
                                    },
                                }}
                            >
                                <SvgIcon component={Business} sx={{ marginRight: "8px", display: { xss: "none", xs: "flex" } }} />
                                More Info
                            </Button>
                        </Link>
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default CodeInvitationCard;
