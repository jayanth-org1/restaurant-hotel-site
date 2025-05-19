// Shared menu data for use across components

export const menuItemsData = [
  {
    id: 1,
    name: "Greek Salad",
    description: "Fresh and crispy salad with tomatoes, cucumbers, olives and feta cheese.",
    price: 12.99,
    image: "/images/greek-salad.jpg",
    category: "starters"
  },
  {
    id: 2,
    name: "Bruschetta",
    description: "Toasted bread with tomatoes, garlic and basil.",
    price: 8.99,
    image: "/images/bruschetta.jpg",
    category: "starters"
  },
  {
    id: 3,
    name: "Lemon Dessert",
    price: 6.99,
    category: "desserts"
  },
  {
    id: 3,
    name: "Grilled Fish",
    description: "Fresh catch of the day, grilled to perfection with lemon and herbs.",
    price: 24.99,
    image: "/images/grilled-fish.jpg",
    category: "mains"
  }
];

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

export const menuItems = []; 