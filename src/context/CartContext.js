import { createContext, useContext, useReducer, useEffect } from 'react';
import { calculateTax } from '../utils/helpers';

// Initial cart state
const initialState = {
  items: [],
  subtotal: 0,
  tax: 0,
  total: 0,
  isOpen: false
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => 
        item.id === action.payload.id
      );
      
      let updatedItems;
      
      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        updatedItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // New item, add to cart
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      const subtotal = updatedItems.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0
      );
      
      const tax = calculateTax(subtotal);
      const total = subtotal + tax;
      
      return {
        ...state,
        items: updatedItems,
        subtotal,
        tax,
        total
      };
    }
    
    case 'REMOVE_ITEM': {
      const existingItemIndex = state.items.findIndex(item => 
        item.id === action.payload.id
      );
      
      if (existingItemIndex < 0) return state;
      
      const existingItem = state.items[existingItemIndex];
      let updatedItems;
      
      if (existingItem.quantity === 1) {
        // Remove item completely if quantity is 1
        updatedItems = state.items.filter(item => item.id !== action.payload.id);
      } else {
        // Decrease quantity
        updatedItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      }
      
      const subtotal = updatedItems.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0
      );
      
      const tax = calculateTax(subtotal);
      const total = subtotal + tax;
      
      return {
        ...state,
        items: updatedItems,
        subtotal,
        tax,
        total
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...initialState,
        isOpen: state.isOpen
      };
      
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: action.payload !== undefined ? action.payload : !state.isOpen
      };
      
    case 'REPLACE_CART':
      return {
        ...action.payload
      };
      
    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('restaurantCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart.items && parsedCart.items.length > 0) {
          dispatch({
            type: 'REPLACE_CART',
            payload: parsedCart
          });
        }
      } catch (error) {
        console.error('Error parsing saved cart:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('restaurantCart', JSON.stringify(state));
  }, [state]);
  
  // Cart actions
  const addToCart = (item) => {
    if (!item) return;
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  
  const removeFromCart = (item) => {
    if (!item) return;
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const toggleCart = (isOpen) => {
    dispatch({ type: 'TOGGLE_CART', payload: isOpen });
  };
  
  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      removeFromCart,
      clearCart,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 