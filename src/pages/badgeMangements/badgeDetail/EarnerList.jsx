import { CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import StatusCode from "../../../assets/images/NoData.svg";
import theme from '../../../assets/themes';

const EarnerList = ({emails}) => {
    // State for handling selected emails

  return (
    emails?.length !== 0 ? (
        <Box>
            {emails.map((item, index) => (
                <Box key={index} sx={{ py: 1 }}>
                    {item}
                </Box>
            ))}
        </Box>
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
            <CardMedia
                component="img"
                image={StatusCode}
                alt="No badges found"
                sx={{ maxWidth: 400, width: "100%" }}
            />
        </Box>
    )
)}

export default EarnerList