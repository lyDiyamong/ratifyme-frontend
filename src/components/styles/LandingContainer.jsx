import { Box } from '@mui/material';

const LandingContainer = ({children}) => {
  return (
    <Box
      sx={{ width: "100%", maxWidth: "1200px", mx: "auto", px: "10px" }}
    >
      {children}
    </Box>
  );
};

export default LandingContainer;
