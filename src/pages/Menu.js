import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Tabs, Tab, Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, IconButton } from '@mui/material';
import { formatCurrency } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import SpecialOffers from '../components/SpecialOffers';
import { usePreferences } from '../context/UserPreferencesContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// Import menu data from a shared location
import { menuItems } from '../data/menuData';

const Menu = () => {
  const [category, setCategory] = useState('starters');
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showSpecials, setShowSpecials] = useState(true);
  
  // Get cart functions from context
  const { items, addToCart, removeFromCart } = useCart();
  
  // Get user preferences functions from context
  const { isFavorite, addFavorite, removeFavorite } = usePreferences();
  
  // Handle category change
  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
  };
  
  // Handle item selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };
  
  // Add item to cart
  const handleAddToCart = (item, event) => {
    if (event) {
      event.stopPropagation();
    }
    addToCart(item || selectedItem);
    if (dialogOpen) {
      setDialogOpen(false);
    }
    setSnackbarOpen(true);
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
  
  // Add this debug code at the top of the Menu component
  useEffect(() => {
    console.log('Cart items:', items);
  }, [items]);
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Our Menu
      </Typography>
      
      {showSpecials && (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="h2">
              Today's Specials
            </Typography>
            <Button 
              variant="text" 
              color="primary"
              onClick={() => setShowSpecials(false)}
            >
              Hide Specials
            </Button>
          </Box>
          <SpecialOffers />
        </Box>
      )}
      
      {/* Category tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={category} onChange={handleCategoryChange} centered>
          <Tab label="Starters" value="starters" />
          <Tab label="Main Course" value="mainCourse" />
          <Tab label="Desserts" value="desserts" />
        </Tabs>
      </Box>
      
      {/* Menu items grid */}
      <Grid container spacing={3}>
        {menuItems[category].map((item) => {
          const quantity = getItemQuantity(item.id);
          
          return (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }} onClick={() => handleItemSelect(item)}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  
                  {/* Favorite button */}
                  <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        isFavorite(item.id) ? removeFavorite(item.id) : addFavorite(item.id);
                      }}
                      color="secondary"
                      size="small"
                    >
                      {isFavorite(item.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <Typography variant="h6" color="primary">
                      {formatCurrency(item.price)}
                    </Typography>
                    
                    {/* Cart controls */}
                    {quantity > 0 ? (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={(e) => handleRemoveFromCart(item, e)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{quantity}</Typography>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={(e) => handleAddToCart(item, e)}
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
                        onClick={(e) => handleAddToCart(item, e)}
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
      
      {/* Item detail dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        {selectedItem && (
          <>
            <DialogTitle>{selectedItem.name}</DialogTitle>
            <DialogContent>
              <Typography variant="body1" paragraph>
                {selectedItem.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {selectedItem.allergens && (
                  <>Allergens: {selectedItem.allergens.join(', ')}</>
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {selectedItem.vegetarian ? 'Vegetarian' : 'Non-vegetarian'}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                {formatCurrency(selectedItem.price)}
              </Typography>
              
              {/* Cart controls in dialog */}
              {getItemQuantity(selectedItem.id) > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Typography>In your cart: </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleRemoveFromCart(selectedItem)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{getItemQuantity(selectedItem.id)}</Typography>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleAddToCart(selectedItem)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
              {getItemQuantity(selectedItem.id) === 0 && (
                <Button onClick={() => handleAddToCart(selectedItem)} variant="contained" color="primary">
                  Add to Cart
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
      
      {/* Snackbar notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          Item added to cart!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Menu; 