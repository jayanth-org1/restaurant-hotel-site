import { Container, Typography, Grid, Box, Paper } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        About Us
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6 }}>
        A Legacy of Luxury and Hospitality
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Our Story
            </Typography>
            <Typography paragraph>
              Established in 1995, our hotel has been providing exceptional service and 
              memorable experiences to guests from around the world. We pride ourselves 
              on combining traditional hospitality with modern luxury.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Typography paragraph>
              To provide our guests with an unforgettable experience through excellent 
              service, comfortable accommodations, and exceptional dining, while maintaining 
              the highest standards of quality and hospitality to make our guests feel at home.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About; 