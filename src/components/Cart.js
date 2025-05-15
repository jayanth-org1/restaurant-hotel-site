import { useState, useEffect } from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Button, 
  Divider,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';

const Cart = () => {
  const { 
    items, 
    subtotal, 
    tax, 
    total, 
    isOpen, 
    addToCart, 
    removeFromCart, 
    clearCart, 
    toggleCart 
  } = useCart();
  
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  useEffect(() => {
    console.log('Cart component items:', items);
  }, [items]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckout = () => {
    setCheckoutDialogOpen(true);
  };
  
  const handleCloseCheckout = () => {
    setCheckoutDialogOpen(false);
  };
  
  const handleSubmitOrder = () => {
    // In a real app, this would send the order to a backend
    const orderData = {
      id: `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].substring(0, 5),
      status: 'Processing',
      items,
      subtotal,
      tax,
      total,
      deliveryAddress: customerInfo.address
    };
    
    console.log('Order submitted:', orderData);
    
    // Save to order history
    const savedOrders = localStorage.getItem('orderHistory');
    let orderHistory = [];
    
    if (savedOrders) {
      try {
        orderHistory = JSON.parse(savedOrders);
      } catch (error) {
        console.error('Error parsing saved orders:', error);
      }
    }
    
    // Add new order to history
    orderHistory = [orderData, ...orderHistory];
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    
    setOrderComplete(true);
    setTimeout(() => {
      setCheckoutDialogOpen(false);
      setOrderComplete(false);
      clearCart();
      toggleCart(false);
    }, 3000);
  };
  
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  return (
    <>
      {/* Cart Icon with Badge */}
      <Badge badgeContent={itemCount} color="secondary" sx={{ mr: 2 }}>
        <IconButton 
          color="inherit" 
          onClick={() => toggleCart(true)}
          aria-label="shopping cart"
        >
          <ShoppingCartIcon />
        </IconButton>
      </Badge>
      
      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => toggleCart(false)}
      >
        <Box sx={{ width: 350, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Your Order</Typography>
            <IconButton onClick={() => toggleCart(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          {items.length === 0 ? (
            <Typography sx={{ my: 4, textAlign: 'center' }}>
              Your cart is empty
            </Typography>
          ) : (
            <>
              <List>
                {items.map((item) => (
                  <ListItem 
                    key={item.id}
                    secondaryAction={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          edge="end" 
                          aria-label="remove"
                          onClick={() => removeFromCart(item)}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                        <IconButton 
                          edge="end" 
                          aria-label="add"
                          onClick={() => addToCart(item)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText 
                      primary={item.name} 
                      secondary={formatCurrency(item.price)}
                    />
                  </ListItem>
                ))}
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>{formatCurrency(subtotal)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Tax:</Typography>
                  <Typography>{formatCurrency(tax)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <Typography>Total:</Typography>
                  <Typography>{formatCurrency(total)}</Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  onClick={clearCart}
                  fullWidth
                >
                  Clear Cart
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleCheckout}
                  fullWidth
                >
                  Checkout
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
      
      {/* Checkout Dialog */}
      <Dialog 
        open={checkoutDialogOpen} 
        onClose={handleCloseCheckout}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {orderComplete ? 'Order Confirmed!' : 'Complete Your Order'}
        </DialogTitle>
        <DialogContent>
          {orderComplete ? (
            <Typography>
              Thank you for your order! A confirmation has been sent to your email.
            </Typography>
          ) : (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Full Name"
                  value={customerInfo.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={customerInfo.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  label="Phone"
                  value={customerInfo.phone}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="address"
                  label="Delivery Address"
                  value={customerInfo.address}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Order Summary</Typography>
                {items.map(item => (
                  <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>
                      {item.name} x {item.quantity}
                    </Typography>
                    <Typography>
                      {formatCurrency(item.price * item.quantity)}
                    </Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>{formatCurrency(subtotal)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Tax:</Typography>
                  <Typography>{formatCurrency(tax)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <Typography>Total:</Typography>
                  <Typography>{formatCurrency(total)}</Typography>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        {!orderComplete && (
          <DialogActions>
            <Button onClick={handleCloseCheckout}>Cancel</Button>
            <Button 
              onClick={handleSubmitOrder} 
              variant="contained" 
              color="primary"
              disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address}
            >
              Place Order
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default Cart; 