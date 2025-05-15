import { createContext, useContext, useState, useEffect } from 'react';

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
  
  // Load preferences from localStorage on initial render
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Error parsing saved preferences:', error);
      }
    }
  }, []);
  
  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);
  
  // Update a specific preference
  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Add a favorite item
  const addFavorite = (itemId) => {
    setPreferences(prev => ({
      ...prev,
      favoriteItems: [...prev.favoriteItems, itemId]
    }));
  };
  
  // Remove a favorite item
  const removeFavorite = (itemId) => {
    setPreferences(prev => ({
      ...prev,
      favoriteItems: prev.favoriteItems.filter(id => id !== itemId)
    }));
  };
  
  // Check if an item is a favorite
  const isFavorite = (itemId) => {
    return preferences.favoriteItems.includes(itemId);
  };
  
  return (
    <UserPreferencesContext.Provider value={{
      preferences,
      updatePreference,
      addFavorite,
      removeFavorite,
      isFavorite
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