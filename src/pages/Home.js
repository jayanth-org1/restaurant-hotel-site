import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [specialOffers, setSpecialOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchSpecials = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        const data = await new Promise(resolve => {
          setTimeout(() => {
            resolve([
              { id: 1, name: "Greek Salad", price: 12.99 },
              { id: 2, name: "Bruschetta", price: 8.99 },
              { id: 3, name: "Lemon Dessert", price: 6.99 }
            ]);
          }, 1000);
        });
        
        setSpecialOffers(data);
        
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        
      } catch (error) {
        console.error("Failed to fetch specials:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchSpecials();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Hotel & Restaurant
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Experience luxury accommodation and fine dining
        </Typography>
        
        {isLoading ? (
          <Typography>Loading special offers...</Typography>
        ) : (
          specialOffers.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Today's Specials:</Typography>
              {specialOffers.map(offer => (
                <Typography key={offer.id}>{offer.name} - {offer.price}</Typography>
              ))}
            </Box>
          )
        )}
        
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