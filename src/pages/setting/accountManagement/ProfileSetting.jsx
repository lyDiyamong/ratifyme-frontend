import { Box, Card, CardContent, Typography } from '@mui/material';

const ProfileSetting = () => {
  const profileData = {
    education: 'Stanford University',
    languages: 'English, Spanish, Italian',
    department: 'Product Design',
    workHistory: 'Google, Facebook',
    organization: 'Simmmple Web LLC',
    birthday: '20 July 1986',
  };

  // Define the profile details in an array for dynamic rendering
  const profileDetails = [
    { label: "Education", value: profileData.education },
    { label: "Languages", value: profileData.languages },
    { label: "Department", value: profileData.department },
    { label: "Work History", value: profileData.workHistory },
    { label: "Organization", value: profileData.organization },
    { label: "Birthday", value: profileData.birthday }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      {profileDetails.map((detail, index) => (
        <Box
          key={index}
          sx={{
            flex: '1 1 calc(50% - 16px)',
            minWidth: '280px', 
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6">{detail.label}</Typography>
              <Typography>{detail.value}</Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default ProfileSetting;
