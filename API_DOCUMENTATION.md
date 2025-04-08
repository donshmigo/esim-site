# Droam API Integration Documentation

This document outlines the integration with the Droam API for eSIM management.

## Overview

The Droam API integration provides the following functionality:

- Browse and select eSIM data plans
- Purchase new eSIMs
- Activate and deactivate eSIMs
- View eSIM usage statistics
- Manage user profiles associated with eSIMs

## Architecture

The integration follows a service-based architecture:

- **API Client**: Core client handling authentication and request/response formatting
- **Service Modules**: Separate modules for plans, orders, eSIMs, and users
- **React Hooks**: Custom hooks for component integration
- **Context Provider**: Global API access throughout the application

## Authentication

The integration uses OAuth 2.0 client credentials flow. Authentication credentials are stored in environment variables:

```
VITE_DROAM_API_BASE_URL=https://api.droam.com
VITE_DROAM_API_CLIENT_ID=your_client_id_here
VITE_DROAM_API_CLIENT_SECRET=your_client_secret_here
VITE_DROAM_API_ENVIRONMENT=sandbox # or production
```

## Components

### Pages

- **Checkout**: Flow for selecting and purchasing new eSIMs
- **ESIMDashboard**: Dashboard for managing existing eSIMs

### UI Components

- **PlanSelector**: Component for displaying and selecting data plans
- **ESIMCard**: Card component for displaying eSIM details and actions

## React Hooks

- **useDataPlans**: Fetch available data plans
- **useESIM**: Manage a single eSIM (activate, deactivate, etc.)
- **useUserESIMs**: Fetch all eSIMs for a user
- **useCreateOrder**: Create a new eSIM order

## Usage Examples

### Fetching Available Plans

```jsx
import { useDataPlans } from '../hooks/useDataPlans';

function PlanList() {
  const { plans, loading, error } = useDataPlans();
  
  if (loading) return <div>Loading plans...</div>;
  
  return (
    <div>
      {plans.map(plan => (
        <div key={plan.id}>{plan.name}</div>
      ))}
    </div>
  );
}
```

### Managing an eSIM

```jsx
import { useESIM } from '../hooks/useESIM';

function ESIMManager({ esimId }) {
  const { esim, loading, activateEsim, deactivateEsim } = useESIM(esimId);
  
  if (loading) return <div>Loading eSIM details...</div>;
  
  return (
    <div>
      <h2>eSIM {esim.iccid}</h2>
      <p>Status: {esim.status}</p>
      
      {esim.status === 'provisioned' ? (
        <button onClick={activateEsim}>Activate</button>
      ) : (
        <button onClick={deactivateEsim}>Deactivate</button>
      )}
    </div>
  );
}
```

## Troubleshooting

- **Authentication Errors**: Check that your API credentials are correct in the .env file
- **Network Errors**: Ensure that your application has internet access
- **Rate Limiting**: The API has a rate limit of 100 requests per minute

## API References

- Droam API Documentation: [https://api.droam.com/docs](https://api.droam.com/docs)
- Admin Portal: [https://admin.droam.com](https://admin.droam.com) 