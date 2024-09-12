import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, Stack } from "@mui/material";
import theme from "../assets/themes";

export default function BadgeListCard({ badges = [] }) {
    return (
        <Box>
            <Typography variant="h6" sx={{ marginTop: 2, padding: 1 }}>Total Badges: {badges.length}</Typography>
            <Grid container spacing={3}>
                {badges.map((badge) => (
                    <Grid item xs={12} sm={6} md={4} xl={3} key={badge.id}>
                        <Card
                            sx={{
                                maxWidth: { xs: '100%', sm: 320, md: 340, lg: 360 },
                                height: { xs: 'auto', md: 400 }, 
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: 3,
                                borderRadius: 3, 
                                padding: 2, 
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="160"
                                image={badge.imageUrl}
                                alt={badge.title}
                                sx={{
                                    borderRadius: 2,
                                    objectFit: 'cover',
                                }}
                            />
                            <CardContent>
                                <Stack>
                                    {/* Title - allow up to 2 lines */}
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: { xs: '1rem', sm: '1.25rem' },
                                            fontWeight: 'bold',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,          // Limit to 2 lines
                                            WebkitBoxOrient: 'vertical', // Necessary for line clamping
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',    // Ellipsis for overflowed text
                                            wordWrap: 'break-word',      // Ensures the text breaks and wraps
                                        }}
                                    >
                                        {badge.title}
                                    </Typography>

                                    {/* Institution - limit to 1 line */}
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        sx={{
                                            fontSize: { xs: '0.875rem', md: '1rem' },
                                            whiteSpace: 'nowrap',          // Prevents wrapping to more than 1 line
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',      // Ellipsis for overflowed text
                                            wordWrap: 'break-word',        // Ensures text breaks properly within 1 line
                                        }}
                                    >
                                        {badge.institution}
                                    </Typography>
                                </Stack>
                            </CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    padding: 1,
                                }}
                            >
                                <Button
                                    sx={{
                                        color: theme.palette.customColors.white,
                                        backgroundColor: theme.palette.primary.main,
                                        padding: '6px 16px',
                                        borderRadius: 3,
                                    }}
                                >
                                    Visit
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
