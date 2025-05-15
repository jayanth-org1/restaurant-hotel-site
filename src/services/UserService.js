import { NotificationService } from './NotificationService';

// Simulate a user database
const users = {
  'user@example.com': {
    name: 'John Doe',
    email: 'user@example.com',
    phone: '555-123-4567',
    address: '123 Main St, Anytown, USA',
    preferences: {
      dietaryRestrictions: ['gluten-free'],
      favoriteItems: ['m3', 'd2']
    }
  }
};

export const UserService = {
  // Get user profile
  getProfile: (email) => {
    return users[email] || null;
  },
  
  // Update user profile
  updateProfile: (email, data) => {
    if (!users[email]) {
      users[email] = { email };
    }
    
    users[email] = {
      ...users[email],
      ...data
    };
    
    NotificationService.notify('Profile updated successfully', 'success');
    return users[email];
  },
  
  // Check if an item is in user's favorites
  isFavorite: (email, itemId) => {
    if (!users[email] || !users[email].preferences || !users[email].preferences.favoriteItems) {
      return false;
    }
    return users[email].preferences.favoriteItems.includes(itemId);
  },
  
  // Add an item to user's favorites
  addFavorite: (email, itemId) => {
    if (!users[email]) {
      users[email] = { 
        email,
        preferences: { favoriteItems: [] }
      };
    }
    
    if (!users[email].preferences) {
      users[email].preferences = { favoriteItems: [] };
    }
    
    if (!users[email].preferences.favoriteItems) {
      users[email].preferences.favoriteItems = [];
    }
    
    if (!users[email].preferences.favoriteItems.includes(itemId)) {
      users[email].preferences.favoriteItems.push(itemId);
      NotificationService.notify('Added to favorites', 'success');
    }
    
    return users[email].preferences.favoriteItems;
  },
  
  // Remove an item from user's favorites
  removeFavorite: (email, itemId) => {
    if (!users[email] || !users[email].preferences || !users[email].preferences.favoriteItems) {
      return [];
    }
    
    users[email].preferences.favoriteItems = users[email].preferences.favoriteItems.filter(
      id => id !== itemId
    );
    
    NotificationService.notify('Removed from favorites', 'info');
    return users[email].preferences.favoriteItems;
  }
}; 