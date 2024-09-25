import Mong from "../assets/images/YaMong.webp"
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";

function IssuerCard({profileImg, name}) {
    return (
        <Paper>
            <Stack>
                <Avatar sx={{ width: 100, height: 100 }}src={Mong} alt="nice" />
                <Typography >
                    {name}
                </Typography>
            </Stack>
        </Paper>
    );
}

export default IssuerCard;
