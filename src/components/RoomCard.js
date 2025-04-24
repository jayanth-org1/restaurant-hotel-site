import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const RoomCard = ({ room }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={room.image}
        alt={room.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {room.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {room.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ${room.price}/night
          </Typography>
          <Button variant="contained" color="primary">
            Book Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RoomCard; 