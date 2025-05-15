import { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, FormControlLabel, Checkbox, Box } from '@mui/material';
import { validateReservation, formatCurrency } from '../utils/helpers';
import { useCart } from '../context/CartContext';

const Reservation = () => {
  const [reservation, setReservation] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });
  
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const { items, total } = useCart();
  const [includePreOrder, setIncludePreOrder] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({
      ...reservation,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Submit reservation
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateReservation(reservation);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Create reservation object
    const reservationData = {
      ...reservation,
      id: `RES-${Date.now()}`,
      preOrder: includePreOrder ? items : [],
      preOrderTotal: includePreOrder ? total : 0
    };
    
    // Save to localStorage
    const savedReservations = localStorage.getItem('reservations');
    let reservations = [];
    
    if (savedReservations) {
      try {
        reservations = JSON.parse(savedReservations);
      } catch (error) {
        console.error('Error parsing saved reservations:', error);
      }
    }
    
    reservations.push(reservationData);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    
    // Show success message
    setSnackbar({
      open: true,
      message: 'Reservation confirmed! We look forward to serving you.',
      severity: 'success'
    });
    
    // Reset form
    setReservation({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 2,
      specialRequests: ''
    });
  };
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Make a Reservation
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={reservation.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={reservation.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={reservation.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="guests-label">Number of Guests</InputLabel>
                <Select
                  labelId="guests-label"
                  name="guests"
                  value={reservation.guests}
                  onChange={handleChange}
                  label="Number of Guests"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={reservation.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={!!errors.date}
                helperText={errors.date}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time"
                name="time"
                type="time"
                value={reservation.time}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={!!errors.time}
                helperText={errors.time}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Special Requests"
                name="specialRequests"
                value={reservation.specialRequests}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            
            {items.length > 0 && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includePreOrder}
                      onChange={(e) => setIncludePreOrder(e.target.checked)}
                      name="includePreOrder"
                    />
                  }
                  label={`Include pre-order (${items.length} items, ${formatCurrency(total)})`}
                />
                {includePreOrder && (
                  <Box sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                    {items.map((item, index) => (
                      <Typography key={index} variant="body2">
                        {item.quantity}x {item.name}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Grid>
            )}
            
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                size="large"
                fullWidth
              >
                Book Table
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({...snackbar, open: false})}
      >
        <Alert 
          onClose={() => setSnackbar({...snackbar, open: false})} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Reservation; 