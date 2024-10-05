// Certificate.jsx (continued)
import { Badge, Box, Typography } from "@mui/material"; // Using MUI Badge for illustration

const Certificate = ({ recipientName, courseName, date, badge }) => (
    <Box
        // ref={ref}
        sx={{
            width: "600px",
            height: "500px",
            border: "10px groove #1976d2",
            padding: "50px",
            position: "relative",
            textAlign: "center",
            backgroundImage: "url(/path-to-background.png)",
            backgroundSize: "cover",
        }}
    >
        <Typography variant="h3" color="primary" gutterBottom>
            Certificate of Completion
        </Typography>
        <Typography variant="h5" gutterBottom>
            This is to certify that
        </Typography>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
            {recipientName}
        </Typography>
        <Typography variant="h5" gutterBottom>
            has successfully completed the course
        </Typography>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
            {courseName}
        </Typography>
        <Badge badgeContent="Open Badge" color="secondary">
            <Box component="img" src={badge.imageUrl} alt={badge.name} maxWidth={100} maxHeight={100} />
        </Badge>
        <Typography variant="body1" sx={{ position: "absolute", bottom: "50px", width: "100%" }}>
            Date of Completion: {date}
        </Typography>
    </Box>
);

export default Certificate;
