import { Container, Typography, Grid, Card, CardMedia, CardContent, Box, Divider } from '@mui/material';
import Reviews from '../components/Reviews';
import SpecialOffers from '../components/SpecialOffers';
import { useEffect, useState } from 'react';

const menuItems = {
  starters: [
    { name: 'Caesar Salad', price: 12.99, description: 'Fresh romaine lettuce, croutons, parmesan' },
    { name: 'Soup of the Day', price: 8.99, description: 'Chef\'s special preparation' },
  ],
  mainCourse: [
    { name: 'Grilled Salmon', price: 28.99, description: 'Fresh Atlantic salmon with seasonal vegetables' },
    { name: 'Beef Tenderloin', price: 34.99, description: '8oz tenderloin with mushroom sauce' },
  ],
  desserts: [
    { name: 'Chocolate Fondant', price: 9.99, description: 'Warm chocolate cake with vanilla ice cream' },
    { name: 'Crème Brûlée', price: 8.99, description: 'Classic French dessert' },
  ]
};

const Restaurant = () => {
  const [restaurantData, setRestaurantData] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Checking for restaurant updates...");
    }, 3000);
    
    const fetchRestaurantData = async () => {
      try {
        // Simulate API call
        const data = await new Promise(resolve => {
          setTimeout(() => {
            resolve({
              name: "Little Lemon",
              description: "Authentic Mediterranean cuisine",
              // other restaurant data
            });
          }, 1000);
        });
        
        setRestaurantData(data);
      } catch (error) {
        console.error("Failed to fetch restaurant data:", error);
      }
    };
    
    fetchRestaurantData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Our Restaurant
      </Typography>
      
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            height="400"
            image="https://source.unsplash.com/random/800x600/?restaurant"
            alt="Restaurant interior"
            sx={{ borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Fine Dining Experience
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to our elegant restaurant where culinary excellence meets warm hospitality. 
            Our chefs create memorable dishes using the finest seasonal ingredients, 
            sourced locally whenever possible.
          </Typography>
          <Typography variant="body1" paragraph>
            Whether you're joining us for an intimate dinner, a family celebration, 
            or a business meeting, we strive to make every visit special.
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Opening Hours
          </Typography>
          <Typography variant="body1">
            Monday: Closed<br />
            Tuesday - Thursday: 5:00 PM - 10:00 PM<br />
            Friday - Saturday: 5:00 PM - 11:00 PM<br />
            Sunday: 4:00 PM - 9:00 PM
          </Typography>
        </Grid>
      </Grid>
      
      {/* Special Offers Section */}
      <Box sx={{ mb: 6 }}>
        <SpecialOffers />
      </Box>
      
      <Divider sx={{ my: 6 }} />
      
      {/* Menu Preview Section */}
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        Menu Highlights
      </Typography>
      
      {Object.entries(menuItems).map(([category, items]) => (
        <Box key={category} sx={{ mb: 6 }}>
          <Typography variant="h4" component="h3" gutterBottom sx={{ mt: 4 }}>
            {category === 'starters' ? 'Starters' : 
             category === 'mainCourse' ? 'Main Course' : 'Desserts'}
          </Typography>
          <Grid container spacing={3}>
            {items.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {item.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${item.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
      
      <Divider sx={{ my: 6 }} />
      
      {/* Reviews Section */}
      <Reviews />
    </Container>
  );
};

export default Restaurant; 