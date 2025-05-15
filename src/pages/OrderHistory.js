import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Divider,
  Chip,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatCurrency } from '../utils/helpers';

// Sample order history data
const sampleOrders = [
  {
    id: 'ORD-2023-001',
    date: '2023-11-15',
    time: '19:30',
    status: 'Delivered',
    items: [
      { id: 'm1', name: 'Grilled Salmon', price: 28.99, quantity: 2 },
      { id: 's1', name: 'Caesar Salad', price: 12.99, quantity: 1 },
      { id: 'd1', name: 'Chocolate Fondant', price: 9.99, quantity: 2 }
    ],
    subtotal: 90.95,
    tax: 7.50,
    total: 98.45,
    deliveryAddress: '123 Main St, Anytown, USA'
  },
  {
    id: 'ORD-2023-002',
    date: '2023-11-08',
    time: '20:15',
    status: 'Delivered',
    items: [
      { id: 'm2', name: 'Beef Tenderloin', price: 34.99, quantity: 1 },
      { id: 's2', name: 'Soup of the Day', price: 8.99, quantity: 1 }
    ],
    subtotal: 43.98,
    tax: 3.63,
    total: 47.61,
    deliveryAddress: '123 Main St, Anytown, USA'
  },
  {
    id: 'ORD-2023-003',
    date: '2023-10-25',
    time: '18:45',
    status: 'Delivered',
    items: [
      { id: 'm3', name: 'Vegetable Risotto', price: 22.99, quantity: 1 },
      { id: 'd2', name: 'Crème Brûlée', price: 8.99, quantity: 1 }
    ],
    subtotal: 31.98,
    tax: 2.64,
    total: 34.62,
    deliveryAddress: '123 Main St, Anytown, USA'
  }
];

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll use the sample data
    const savedOrders = localStorage.getItem('orderHistory');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Error parsing saved orders:', error);
        setOrders(sampleOrders);
      }
    } else {
      setOrders(sampleOrders);
    }
  }, []);
  
  // Save to localStorage when orders change
  useEffect(() => {
    localStorage.setItem('orderHistory', JSON.stringify(orders));
  }, [orders]);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'success';
      case 'Processing':
        return 'info';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Order History
      </Typography>
      
      {orders.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6">
            You haven't placed any orders yet.
          </Typography>
        </Paper>
      ) : (
        <Box>
          {orders.map((order) => (
            <Accordion key={order.id} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {order.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.date} at {order.time}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body1">
                      {formatCurrency(order.total)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4} sx={{ textAlign: { sm: 'right' } }}>
                    <Chip 
                      label={order.status} 
                      color={getStatusColor(order.status)} 
                      size="small" 
                    />
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Order Details
                  </Typography>
                  
                  {order.items.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>
                        {item.quantity} x {item.name}
                      </Typography>
                      <Typography>
                        {formatCurrency(item.price * item.quantity)}
                      </Typography>
                    </Box>
                  ))}
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Subtotal:</Typography>
                    <Typography>{formatCurrency(order.subtotal)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Tax:</Typography>
                    <Typography>{formatCurrency(order.tax)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', mb: 2 }}>
                    <Typography>Total:</Typography>
                    <Typography>{formatCurrency(order.total)}</Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary">
                    Delivery Address: {order.deliveryAddress}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default OrderHistory; 