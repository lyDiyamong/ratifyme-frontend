// MUI import
import { Box } from '@mui/material';

// =========== Start DashboardContainer ===========
const DashboardContainer = ({children, sx}) => {
  return (
    <Box
      sx={{ width: "100%", maxWidth: "1600px", mx: "auto", px: "24px", ...sx }}
    >
      {children}
    </Box>
  );
};

export default DashboardContainer;
// =========== End DashboardContainer ===========