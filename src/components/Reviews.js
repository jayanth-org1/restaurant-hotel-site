import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Rating, 
  Avatar, 
  Button, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Grid,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { menuItems } from '../data/menuData';

// Sample review data
const initialReviews = [
  {
    id: 1,
    name: 'John D.',
    rating: 5,
    date: '2023-10-15',
    comment: 'The food was exceptional and the service impeccable. Will definitely be coming back!',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    name: 'Sarah M.',
    rating: 4,
    date: '2023-10-10',
    comment: 'Great atmosphere and delicious food. The desserts are a must-try!',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: 3,
    name: 'Robert J.',
    rating: 5,
    date: '2023-09-28',
    comment: 'The wine selection is excellent and pairs perfectly with their dishes. The staff was very knowledgeable.',
    avatar: 'https://i.pravatar.cc/150?img=3'
  }
];

const Reviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });
  const [menuItemReviews, setMenuItemReviews] = useState({});
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  
  // Load reviews from localStorage on initial render
  useEffect(() => {
    const savedReviews = localStorage.getItem('restaurantReviews');
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (error) {
        console.error('Error parsing saved reviews:', error);
      }
    }
  }, []);
  
  // Save reviews to localStorage when they change
  useEffect(() => {
    localStorage.setItem('restaurantReviews', JSON.stringify(reviews));
  }, [reviews]);
  
  useEffect(() => {
    // Group reviews by menu item
    const reviewsByItem = {};
    reviews.forEach(review => {
      if (review.itemId) {
        if (!reviewsByItem[review.itemId]) {
          reviewsByItem[review.itemId] = [];
        }
        reviewsByItem[review.itemId].push(review);
      }
    });
    setMenuItemReviews(reviewsByItem);
  }, [reviews]);
  
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setNewReview({
      name: '',
      rating: 5,
      comment: ''
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRatingChange = (event, newValue) => {
    setNewReview(prev => ({
      ...prev,
      rating: newValue
    }));
  };
  
  const handleSubmitReview = () => {
    const review = {
      id: Date.now(),
      ...newReview,
      date: new Date().toISOString().split('T')[0],
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };
    
    setReviews(prev => [review, ...prev]);
    setSnackbarOpen(true);
    handleCloseDialog();
  };
  
  const handleMenuItemSelect = (event) => {
    setSelectedMenuItem(event.target.value);
    if (event.target.value) {
      setNewReview(prev => ({
        ...prev,
        itemId: event.target.value
      }));
    }
  };
  
  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h2" gutterBottom>
            Customer Reviews
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating value={averageRating} precision={0.5} readOnly />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)
            </Typography>
          </Box>
        </Box>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleOpenDialog}
        >
          Write a Review
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {reviews.map((review) => (
          <Grid item xs={12} md={6} key={review.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Avatar src={review.avatar} alt={review.name} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1">{review.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating value={review.rating} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {review.date}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body1">{review.comment}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Menu Item Reviews Section */}
      {Object.keys(menuItemReviews).length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" component="h3" gutterBottom>
            Menu Item Reviews
          </Typography>
          
          {Object.entries(menuItemReviews).map(([itemId, itemReviews]) => {
            // Find the menu item details
            let itemName = "Unknown Item";
            let itemCategory = "";
            
            Object.entries(menuItems).forEach(([category, items]) => {
              const foundItem = items.find(item => item.id === itemId);
              if (foundItem) {
                itemName = foundItem.name;
                itemCategory = category;
              }
            });
            
            return (
              <Box key={itemId} sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                  {itemName} ({itemCategory === 'mainCourse' ? 'Main Course' : 
                    itemCategory.charAt(0).toUpperCase() + itemCategory.slice(1)})
                </Typography>
                
                <Grid container spacing={2}>
                  {itemReviews.map((review) => (
                    <Grid item xs={12} md={6} key={review.id}>
                      <Card>
                        <CardContent>
                          <Box sx={{ display: 'flex', mb: 2 }}>
                            <Avatar src={review.avatar || `https://i.pravatar.cc/150?u=${review.name}`} />
                            <Box sx={{ ml: 2 }}>
                              <Typography variant="subtitle1">{review.name}</Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Rating value={review.rating} size="small" readOnly />
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                  {review.date}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Typography variant="body1">{review.comment}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            );
          })}
        </Box>
      )}
      
      {/* Add Review Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              name="name"
              label="Your Name"
              value={newReview.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Box sx={{ my: 2 }}>
              <Typography component="legend">Your Rating</Typography>
              <Rating
                name="rating"
                value={newReview.rating}
                onChange={handleRatingChange}
                size="large"
              />
            </Box>
            <TextField
              name="comment"
              label="Your Review"
              value={newReview.comment}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="menu-item-select-label">Menu Item (Optional)</InputLabel>
              <Select
                labelId="menu-item-select-label"
                id="menu-item-select"
                value={selectedMenuItem || ''}
                onChange={handleMenuItemSelect}
                label="Menu Item (Optional)"
              >
                <MenuItem value="">
                  <em>General Review</em>
                </MenuItem>
                {Object.entries(menuItems).flatMap(([category, items]) => 
                  items.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmitReview} 
            variant="contained" 
            color="primary"
            disabled={!newReview.name || !newReview.comment}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          Thank you! Your review has been submitted.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Reviews; 