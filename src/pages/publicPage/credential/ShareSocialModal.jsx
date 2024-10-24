import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, Typography } from "@mui/material";
import theme from "../../../assets/themes";

const ShareSocialModal = ({ open, handleClose, credUrl }) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle variant="h4" fontWeight={theme.fontWeight.semiBold} my={2}>
                Share Award
                <Typography color="textSecondary">This will share your Achievement to social media.</Typography>
            </DialogTitle>

            <DialogContent>
                <Stack gap={2}>
                    <Stack
                        component="a"
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${credUrl}&text=Grateful%20for%20the%20opportunity%20to%20grow%20and%20achieve%20this%20milestone.%20%23lifelonglearning%20%23achievement%20%23ratifyme%20%23openbadge`}
                        target="_blank"
                        flexDirection="row"
                        sx={{
                            border: "1px solid #EDEDED",
                            borderRadius: "8px",
                            minHeight: 80,
                            alignItems: "center",
                            gap: 2,
                            p: 1,
                            textDecoration: "none",
                            "&:hover": {
                                borderColor: "#1A87EC",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderTopLeftRadius: "8px",
                                borderBottomLeftRadius: "8px",
                            }}
                        >
                            <Box
                                alt="Profile"
                                component="img"
                                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                                sx={{ m: 1, width: 40, height: 40 }}
                            />
                        </Box>
                        <Stack>
                            <Typography variant="body1" fontWeight={theme.fontWeight.semiBold} color={theme.palette.text.primary}>
                                Share to Linkedin
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Share your Achievement to Linkedin.
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack
                        component="a"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${credUrl}`}
                        target="_blank"
                        flexDirection="row"
                        sx={{
                            border: "1px solid #EDEDED",
                            borderRadius: "8px",
                            minHeight: 80,
                            alignItems: "center",
                            gap: 2,
                            p: 1,
                            textDecoration: "none",
                            "&:hover": {
                                borderColor: "#1A87EC",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderTopLeftRadius: "8px",
                                borderBottomLeftRadius: "8px",
                            }}
                        >
                            <Box
                                alt="Profile"
                                component="img"
                                src="https://cdn.iconscout.com/icon/free/png-256/free-facebook-logo-icon-download-in-svg-png-gif-file-formats--fb-social-media-70-flat-icons-color-pack-logos-432507.png?f=webp&w=256"
                                sx={{ m: 1, width: 40, height: 40 }}
                            />
                        </Box>
                        <Stack>
                            <Typography variant="body1" fontWeight={theme.fontWeight.semiBold} color={theme.palette.text.primary}>
                                Share to Facebook
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Share your Achievement to Facebook.
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack
                        component="a"
                        href={`https://twitter.com/intent/tweet?text=Grateful%20for%20the%20opportunity%20to%20grow%20and%20achieve%20this%20milestone.%20%23lifelonglearning%20%23achievement%20%23ratifyme%20%23openbadge&url=${credUrl}`}
                        target="_blank"
                        flexDirection="row"
                        sx={{
                            border: "1px solid #EDEDED",
                            borderRadius: "8px",
                            minHeight: 80,
                            alignItems: "center",
                            gap: 2,
                            p: 1,
                            textDecoration: "none",
                            "&:hover": {
                                borderColor: "#1A87EC",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderTopLeftRadius: "8px",
                                borderBottomLeftRadius: "8px",
                            }}
                        >
                            <Box
                                alt="Profile"
                                component="img"
                                src="https://img.freepik.com/premium-vector/new-twitter-logo-x-2023-twitter-x-logo-vector-download_691560-10794.jpg"
                                sx={{ m: 1, width: 40, height: 40 }}
                            />
                        </Box>
                        <Stack>
                            <Typography variant="body1" fontWeight={theme.fontWeight.semiBold} color={theme.palette.text.primary}>
                                Share to X
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Share your Achievement to X.
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack
                        component="a"
                        href={`https://pinterest.com/pin/create/button/?url=${credUrl}&media=${credUrl}=Check out my achievement!`}
                        target="_blank"
                        flexDirection="row"
                        sx={{
                            border: "1px solid #EDEDED",
                            borderRadius: "8px",
                            minHeight: 80,
                            alignItems: "center",
                            gap: 2,
                            p: 1,
                            textDecoration: "none",
                            "&:hover": {
                                borderColor: "#1A87EC",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderTopLeftRadius: "8px",
                                borderBottomLeftRadius: "8px",
                            }}
                        >
                            <Box
                                alt="Pinterest"
                                component="img"
                                src="https://cdn.iconscout.com/icon/free/png-256/free-pinterest-logo-icon-download-in-svg-png-gif-file-formats--70-flat-social-icons-color-pack-logos-432533.png?f=webp&w=256"
                                sx={{ m: 1, width: 40, height: 40 }}
                            />
                        </Box>
                        <Stack>
                            <Typography variant="body1" fontWeight={theme.fontWeight.semiBold} color={theme.palette.text.primary}>
                                Share to Pinterest
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Pin your achievement on Pinterest.
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack
                        component="a"
                        href={`https://t.me/share/url?url=${credUrl}&text=Check out my achievement!`}
                        target="_blank"
                        flexDirection="row"
                        sx={{
                            border: "1px solid #EDEDED",
                            borderRadius: "8px",
                            minHeight: 80,
                            alignItems: "center",
                            gap: 2,
                            p: 1,
                            textDecoration: "none",
                            "&:hover": {
                                borderColor: "#1A87EC",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderTopLeftRadius: "8px",
                                borderBottomLeftRadius: "8px",
                            }}
                        >
                            <Box
                                alt="Telegram"
                                component="img"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/2048px-Telegram_2019_Logo.svg.png"
                                sx={{ m: 1, width: 40, height: 40 }}
                            />
                        </Box>
                        <Stack>
                            <Typography variant="body1" fontWeight={theme.fontWeight.semiBold} color={theme.palette.text.primary}>
                                Share to Telegram
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Share your achievement in Telegram chat.
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShareSocialModal;
