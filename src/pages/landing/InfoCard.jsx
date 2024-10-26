import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, CardMedia } from '@mui/material';

function InfoCard() {
  const cardData = [
    {
      title: 'Native APIs',
      content: 'What sets ToDesktop apart is its seamless integration with native APIs using our existing web codebase. By tapping into APIs like Tray and Notifications, we\'ve crafted an exceptionally polished desktop user experience.',
      avatar: 'rick_pastoor.jpg', // Replace with actual avatar image path
      name: 'Rick Pastoor',
      company: 'Rise'
    },
    {
      title: 'Cleaner, less cluttered UI',
      content: 'Having a desktop app gives us the freedom to design the experience we want, including better keyboard shortcuts and a cleaner UI. It was a no-brainer for us to use ToDesktop.',
      avatar: 'max_musing.jpg', // Replace with actual avatar image path
      name: 'Max Musing',
      company: 'Basedash'
    },
    {
      title: 'Code optional',
      content: 'It was unbelievably simple for us to get a desktop app up and running, and we didn\'t have to write a single line of code. Once we had this MVP, we were able to extend the app\'s functionality with custom behavior using ToDesktop\'s libraries.',
      avatar: 'pouya_rad.jpg', // Replace with actual avatar image path
      name: 'Pouya Rad',
      company: 'LifeAt'
    }
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
      {cardData.map((card, index) => (
        <Card key={index} >
          <CardMedia
            component="img"
            height="140"
            image={`card_image_${index + 1}.jpg`}
            alt={card.title}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {card.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {card.content}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar alt={card.name} src={card.avatar} />
              <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {card.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.company}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default InfoCard;