import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Hotel & Restaurant
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Experience luxury accommodation and fine dining
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            component={Link}
            to="/rooms"
            variant="contained"
            sx={{ mr: 2 }}
          >
            Book a Room
          </Button>
          <Button
            component={Link}
            to="/restaurant"
            variant="outlined"
          >
            View Menu
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 