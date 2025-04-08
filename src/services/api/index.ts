// Export all types
export * from './types';

// Export the API client
export { default as apiClient } from './client';

// Import the services
import { plansService } from './plans';
import { ordersService } from './orders';
import { esimService } from './esims';
import { usersService } from './users';

// Export all services
export { default as plansService } from './plans';
export { default as ordersService } from './orders';
export { default as esimService } from './esims';
export { default as usersService } from './users';

// Export a unified API object with all services
const api = {
  plans: plansService,
  orders: ordersService,
  esims: esimService,
  users: usersService,
};

export default api; 