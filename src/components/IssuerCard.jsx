// MUI import
import { Avatar, Paper, Stack, Typography } from "@mui/material";

// Custom import
import Mong from "../assets/images/YaMong.webp"

/**
 * IssuerCard Component
 *
 * Displays an issuer's profile with a picture and name.
 *
 * @param {string} profileImg - The URL of the profile image (optional, defaults to a placeholder image).
 * @param {string} name - The name of the issuer to display.
 *
 * @returns {JSX.Element} A styled card showing the issuer's avatar and name.
 *
 * ==== Usage ====
 * <IssuerCard
    profileImg="https://example.com/profile.jpg"
    name="John Doe"
    />

 */

// =========== Start IssuerCard ===========
const IssuerCard = ({profileImg, name}) => {
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
// =========== End IssuerCard ===========