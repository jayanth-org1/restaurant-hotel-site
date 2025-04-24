import { Container, Typography, Grid, Card, CardMedia, CardContent, Box, Divider } from '@mui/material';

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
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Our Restaurant
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Experience Fine Dining at its Best
      </Typography>

      {Object.entries(menuItems).map(([category, items]) => (
        <Box key={category} sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 3, textTransform: 'capitalize' }}>
            {category.replace(/([A-Z])/g, ' $1').trim()}
          </Typography>
          <Grid container spacing={3}>
            {items.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
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
    </Container>
  );
};

export default Restaurant; 