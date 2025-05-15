// Shared menu data for use across components

export const menuItems = {
  starters: [
    { 
      id: 'starter1',
      name: 'Caesar Salad', 
      price: 12.99, 
      description: 'Fresh romaine lettuce, croutons, parmesan',
      vegetarian: true,
      allergens: ['dairy', 'gluten']
    },
    { 
      id: 's2',
      name: 'Soup of the Day', 
      price: 8.99, 
      description: 'Chef\'s special preparation, ask your server for today\'s selection',
      allergens: ['varies'],
      vegetarian: false
    },
    { 
      id: 's3',
      name: 'Bruschetta', 
      price: 10.99, 
      description: 'Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil',
      allergens: ['gluten'],
      vegetarian: true
    },
    { 
      id: 's4',
      name: 'Calamari', 
      price: 14.99, 
      description: 'Lightly fried squid served with marinara sauce and lemon wedges',
      allergens: ['gluten', 'seafood'],
      vegetarian: false
    }
  ],
  mainCourse: [
    { 
      id: 'm1',
      name: 'Grilled Salmon', 
      price: 28.99, 
      description: 'Fresh Atlantic salmon with seasonal vegetables and lemon butter sauce',
      allergens: ['fish', 'dairy'],
      vegetarian: false
    },
    { 
      id: 'm2',
      name: 'Beef Tenderloin', 
      price: 34.99, 
      description: '8oz tenderloin with mushroom sauce, garlic mashed potatoes, and roasted vegetables',
      allergens: ['dairy'],
      vegetarian: false
    },
    { 
      id: 'm3',
      name: 'Vegetable Risotto', 
      price: 22.99, 
      description: 'Creamy Arborio rice with seasonal vegetables, white wine, and parmesan cheese',
      allergens: ['dairy'],
      vegetarian: true
    },
    { 
      id: 'm4',
      name: 'Chicken Parmesan', 
      price: 24.99, 
      description: 'Breaded chicken breast topped with marinara sauce and mozzarella, served with spaghetti',
      allergens: ['gluten', 'dairy'],
      vegetarian: false
    }
  ],
  desserts: [
    { 
      id: 'd1',
      name: 'Chocolate Fondant', 
      price: 9.99, 
      description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
      allergens: ['dairy', 'gluten', 'eggs'],
      vegetarian: true
    },
    { 
      id: 'd2',
      name: 'Crème Brûlée', 
      price: 8.99, 
      description: 'Classic French custard with caramelized sugar top',
      allergens: ['dairy', 'eggs'],
      vegetarian: true
    },
    { 
      id: 'd3',
      name: 'Tiramisu', 
      price: 10.99, 
      description: 'Coffee-soaked ladyfingers layered with mascarpone cream and dusted with cocoa',
      allergens: ['dairy', 'gluten', 'eggs'],
      vegetarian: true
    },
    { 
      id: 'd4',
      name: 'Seasonal Fruit Tart', 
      price: 11.99, 
      description: 'Buttery pastry shell filled with vanilla custard and topped with fresh seasonal fruits',
      allergens: ['dairy', 'gluten', 'eggs'],
      vegetarian: true
    }
  ]
};

// Special menu items that change weekly
export const weeklySpecials = [
  {
    id: 'special1',
    name: 'Chef\'s Special Pasta',
    description: 'Handmade pasta with seasonal ingredients and truffle oil',
    price: 24.99,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'special2',
    name: 'Weekend Brunch Set',
    description: 'Complete brunch with eggs benedict, fresh juice, and pastries',
    price: 29.99,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1533920379810-6bedac961c2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'special3',
    name: 'Seafood Platter',
    description: 'Fresh selection of seafood including oysters, shrimp, and crab',
    price: 39.99,
    discount: 0,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

// Wine pairings for menu items
export const winePairings = {
  's1': ['Sauvignon Blanc', 'Pinot Grigio'],
  's4': ['Prosecco', 'Champagne'],
  'm1': ['Chardonnay', 'White Burgundy'],
  'm2': ['Cabernet Sauvignon', 'Merlot', 'Malbec'],
  'm3': ['Pinot Noir', 'Chianti'],
  'd1': ['Port', 'Dessert Wine'],
  'd3': ['Moscato d\'Asti']
}; 