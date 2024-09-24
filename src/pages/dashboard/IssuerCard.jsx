import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ClassroomImage from "../../assets/images/classroom.jpg"; // Correctly imported image
import theme from "../../assets/themes";
import { useFetchEarnerQuery } from "../../store/api/earnerManagement/earnerApis";

export default function IssuerCard() {
    const { data: response, isLoading, isError } = useFetchEarnerQuery();
    const earnerData = response?.data;
    return (
        <>
            <Typography
                variant="h6"
                sx={{
                    fontSize: theme.typography.h4,
                    fontWeight: theme.fontWeight.bold,
                    color: theme.palette.text.primary,
                }}
            >
                All Classes
            </Typography>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" height="140" image={ClassroomImage} alt="Classroom setting" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Classroom
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        A classroom is a learning space where students and teachers interact and engage in educational
                        activities.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </>
    );
}
