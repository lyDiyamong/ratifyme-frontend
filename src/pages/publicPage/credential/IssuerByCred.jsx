import { Box, Stack } from "@mui/system";
import theme from "../../../assets/themes";
import { Avatar, Button, Tooltip, Typography } from "@mui/material";
import { VerifiedRounded } from "@mui/icons-material";
import IssuerSvg from "../../../assets/icons/IssuerSvg.svg";

const CustomTooltip = ({ title, children }) => {
  return (
      <Tooltip
          title={
              <Typography variant="body2" sx={{ color: "white" }}>
                  {title}
              </Typography>
          }
          arrow
          componentsProps={{
              tooltip: {
                  sx: {
                      backgroundColor: "black",
                      borderRadius: "8px",
                      p: 1,
                  },
              },
              arrow: {
                  sx: {
                      color: "black",
                  },
              },
          }}
      >
          {children}
      </Tooltip>
  );
};

const IssuerByCred = ({IssuerName}) => {
    return (
        <Box
            elevation={3}
            sx={{
                p: 2,
                backgroundColor: theme.palette.customColors.white,
                borderRadius: theme.customShape.input,
                border: "1px solid #F5F5F7",
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
            }}
        >
            <Stack flexDirection="row" alignItems="center" gap={1}>
                <Avatar src={IssuerSvg} alt="Profile" sx={{ width: 56, height: 56 }} />
                <Stack>
                    <Typography variant="body3" fontWeight="bold" color="primary" gutterBottom>
                        ISSUER BY
                    </Typography>

                    <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} gutterBottom>
                        {IssuerName}
                    </Typography>
                </Stack>
            </Stack>

            <CustomTooltip title="RatifyMe confirms that this issuer is an officially registered organization.">
                <Button
                    startIcon={<VerifiedRounded />}
                    variant="text"
                    sx={{
                        color: "#0AA4A5",
                        backgroundColor: "#F3FAFA",
                        border: "1px solid #0AA4A5",
                        maxHeight: 25,
                        cursor: "default",
                        "&:hover": {
                            cursor: "help",
                        },
                    }}
                >
                    Verified
                </Button>
            </CustomTooltip>
        </Box>
    );
};

export default IssuerByCred;
