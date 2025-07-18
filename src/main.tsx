import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './i18n/i18n' // Import i18n initialization before any components
import './index.css'
import App from './App.tsx'
import { applyLocationSettings } from './utils/locationDetection'
import { CurrencyProvider } from './contexts/CurrencyContext'
import { ApiProvider } from './contexts/ApiContext'

// Initialize location-based settings in background
// This will detect user's country and set language/currency accordingly
// Don't wait for it to complete - let the app load immediately
applyLocationSettings().catch(error => {
  console.error('Error applying location settings:', error);
});

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApiProvider>
      <CurrencyProvider>
        <RouterProvider router={router} />
      </CurrencyProvider>
    </ApiProvider>
  </StrictMode>
)
