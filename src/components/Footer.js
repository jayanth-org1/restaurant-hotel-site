import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © 2024 Hotel & Restaurant. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 