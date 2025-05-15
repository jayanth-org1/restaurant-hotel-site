import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { NotificationService } from '../services/NotificationService';

const GlobalNotification = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  
  useEffect(() => {
    // Subscribe to notifications
    const unsubscribe = NotificationService.subscribe((msg, type) => {
      setMessage(msg);
      setSeverity(type);
      setOpen(true);
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, []);
  
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert 
        onClose={handleClose} 
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalNotification; 