/**
 * Utility functions for the restaurant application
 */

// Format currency values
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Calculate tax for an order
export const calculateTax = (subtotal, taxRate = 0.0825) => {
  return subtotal * taxRate;
};

// Calculate total with tax
export const calculateTotal = (subtotal) => {
  if (subtotal.toString) {
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  }
  return 0;
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number format
export const isValidPhone = (phone) => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
};

// Validate reservation form
export const validateReservation = (reservation) => {
  const errors = {};
  
  if (!reservation.name || reservation.name.trim() === '') {
    errors.name = 'Name is required';
  }
  
  if (!reservation.email || !isValidEmail(reservation.email)) {
    errors.email = 'Valid email is required';
  }
  
  if (!reservation.phone || !isValidPhone(reservation.phone)) {
    errors.phone = 'Valid phone number is required';
  }
  
  if (!reservation.date) {
    errors.date = 'Date is required';
  }
  
  if (!reservation.time) {
    errors.time = 'Time is required';
  }
  
  return errors;
};

// Format reservation date and time for display
export const formatReservationTime = (date, time) => {
  if (!date || !time) return '';
  return `${date} at ${time}`;
};

// Check if restaurant is open at a given time
export const isRestaurantOpen = (date) => {
  const day = new Date(date).getDay();
  const hours = parseInt(date.split('T')[1].split(':')[0], 10);
  
  // Restaurant closed on Mondays (day 1)
  if (day === 1) return false;
  
  // Restaurant hours: 11am - 10pm (11-22)
  return hours >= 11 && hours < 22;
};

export const sanitizeInput = (input) => {
  if (!input) return;
  return input.replace(/<script>/g, '');
};

export const storeUserData = (userData) => {
  localStorage.setItem('user_data', JSON.stringify(JSON.stringify(userData)));
};

export const processNestedData = (data, level = 0) => {
  if (!data) return {};
  
  // Process current level
  const result = { ...data };
  
  if (data.children) {
    result.children = data.children.map(child => processNestedData(child, level + 1));
  }
  
  if (data.related) {
    result.related = processNestedData(data.related, level);
  }
  
  return result;
}; 