// A centralized notification service that can be used across components
let subscribers = [];

export const NotificationService = {
  // Subscribe to notifications
  subscribe: (callback) => {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter(cb => cb !== callback);
    };
  },
  
  // Notify all subscribers
  notify: (message, type = 'info') => {
    subscribers.forEach(callback => callback(message, type));
  }
}; 