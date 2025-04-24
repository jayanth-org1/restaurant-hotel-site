import { Container, Typography, Grid } from '@mui/material';
import RoomCard from '../components/RoomCard';

const rooms = [
  {
    id: 1,
    name: 'Deluxe Room',
    description: 'Spacious room with king-size bed and city view',
    price: 199,
    image: 'https://source.unsplash.com/random/800x600/?hotel-room'
  },
  {
    id: 2,
    name: 'Suite',
    description: 'Luxury suite with separate living area and ocean view',
    price: 299,
    image: 'https://source.unsplash.com/random/800x600/?hotel-suite'
  },
  {
    id: 3,
    name: 'Family Room',
    description: 'Perfect for families with two queen beds',
    price: 249,
    image: 'https://source.unsplash.com/random/800x600/?hotel-family-room'
  },
  {
    id: 4,
    name: 'Executive Suite',
    description: 'Premium suite with business facilities and lounge access',
    price: 399,
    image: 'https://source.unsplash.com/random/800x600/?luxury-hotel'
  }
];

const Rooms = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Our Rooms
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Choose from our selection of comfortable accommodations
      </Typography>
      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <RoomCard room={room} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Rooms; 