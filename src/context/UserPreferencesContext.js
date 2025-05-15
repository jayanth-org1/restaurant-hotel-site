import { createContext, useContext, useState, useEffect } from 'react';
import { UserService } from '../services/UserService';

// Default preferences
const defaultPreferences = {
  theme: 'light',
  notifications: true,
  dietaryPreferences: [],
  favoriteItems: []
};

// Create context
const UserPreferencesContext = createContext();

export const UserPreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [currentUser] = useState('user@example.com'); // For demo purposes
  
  // Load preferences from UserService on initial render
  useEffect(() => {
    const userProfile = UserService.getProfile(currentUser);
    if (userProfile && userProfile.preferences) {
      setPreferences({
        ...defaultPreferences,
        ...userProfile.preferences
      });
    }
  }, [currentUser]);
  
  // Update a specific preference
  const updatePreference = (key, value) => {
    const updatedPreferences = {
      ...preferences,
      [key]: value
    };
    
    setPreferences(updatedPreferences);
    
    // Update in UserService
    UserService.updateProfile(currentUser, {
      preferences: updatedPreferences
    });
  };
  
  // Add a favorite item
  const addFavorite = (itemId) => {
    UserService.addFavorite(currentUser, itemId);
    setPreferences(prev => ({
      ...prev,
      favoriteItems: [...prev.favoriteItems, itemId]
    }));
  };
  
  // Remove a favorite item
  const removeFavorite = (itemId) => {
    UserService.removeFavorite(currentUser, itemId);
    setPreferences(prev => ({
      ...prev,
      favoriteItems: prev.favoriteItems.filter(id => id !== itemId)
    }));
  };
  
  // Check if an item is a favorite
  const isFavorite = (itemId) => {
    return UserService.isFavorite(currentUser, itemId);
  };
  
  return (
    <UserPreferencesContext.Provider value={{
      preferences,
      updatePreference,
      addFavorite,
      removeFavorite,
      isFavorite,
      currentUser
    }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

// Custom hook to use preferences context
export const usePreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a UserPreferencesProvider');
  }
  return context;
}; 