import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Button, 
  Grid, 
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton
} from '@mui/material';
import { formatCurrency } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { weeklySpecials } from '../data/menuData';

const SpecialOffers = () => {
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const { items, addToCart, removeFromCart } = useCart();
  
  // Add this function to get a fallback image if the provided one fails
  const getFallbackImage = (category) => {
    return `https://source.unsplash.com/featured/?${category},food`;
  };
  
  const handleOpenCouponDialog = () => {
    setCouponDialogOpen(true);
  };
  
  const handleCloseCouponDialog = () => {
    setCouponDialogOpen(false);
  };
  
  const handleApplyCoupon = () => {
    // In a real app, this would validate the coupon with a backend
    console.log('Applying coupon:', couponCode);
    setCouponDialogOpen(false);
    setCouponCode('');
  };
  
  // Add item to cart
  const handleAddToCart = (item, event) => {
    if (event) {
      event.stopPropagation();
    }
    addToCart(item);
  };
  
  // Remove item from cart
  const handleRemoveFromCart = (item, event) => {
    if (event) {
      event.stopPropagation();
    }
    removeFromCart(item);
  };
  
  // Get item quantity in cart
  const getItemQuantity = (itemId) => {
    if (!items || !items.length) return 0;
    const cartItem = items.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h3">
          Weekly Specials
        </Typography>
        <Button 
          variant="outlined" 
          color="primary"
          onClick={handleOpenCouponDialog}
        >
          Have a Coupon?
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {weeklySpecials.map((special) => {
          // Extract the category from the image URL or description for fallback
          const category = special.name.split(' ')[0].toLowerCase();
          
          return (
            <Grid item xs={12} sm={6} md={4} key={special.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={special.image || getFallbackImage(category)}
                  alt={special.name}
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = getFallbackImage(category);
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {special.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {special.description}
                  </Typography>
                  {special.discount && (
                    <Chip 
                      label={`${special.discount}% OFF`} 
                      color="secondary" 
                      size="small" 
                      sx={{ mb: 2 }}
                    />
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <Typography variant="h6" color="primary">
                      {formatCurrency(special.price)}
                    </Typography>
                    
                    {/* Cart controls */}
                    {getItemQuantity(special.id) > 0 ? (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={(e) => handleRemoveFromCart(special, e)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{getItemQuantity(special.id)}</Typography>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={(e) => handleAddToCart(special, e)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    ) : (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={(e) => handleAddToCart(special, e)}
                      >
                        Add
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      
      {/* Coupon Dialog */}
      <Dialog open={couponDialogOpen} onClose={handleCloseCouponDialog}>
        <DialogTitle>Enter Coupon Code</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Coupon Code"
            fullWidth
            variant="outlined"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCouponDialog}>Cancel</Button>
          <Button 
            onClick={handleApplyCoupon} 
            variant="contained" 
            color="primary"
            disabled={!couponCode}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SpecialOffers; 