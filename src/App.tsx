import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';

// Import plan pages
import Plans from './pages/plans';
import LitePlan from './pages/plans/LitePlan';
import TravelerPlan from './pages/plans/TravelerPlan';
import MaxPlan from './pages/plans/MaxPlan';
import BusinessPage from './pages/business';
import ContactPage from './pages/contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import FairUsagePolicy from './pages/FairUsagePolicy';
import Partners from './pages/Partners';
import AboutUs from './pages/AboutUs';

// Import auth pages and components
import { AuthProvider } from './firebase/AuthContext';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import ForgotPassword from './features/auth/ForgotPassword';
import ProtectedRoute from './features/auth/components/ProtectedRoute';

// Import new dashboard components
import ESIMDashboard from './pages/ESIMDashboard';
import Checkout from './pages/Checkout';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/fair-usage-policy" element={<FairUsagePolicy />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/plans/lite" element={<LitePlan />} />
        <Route path="/plans/traveler" element={<TravelerPlan />} />
        <Route path="/plans/max" element={<MaxPlan />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Dashboard Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <ESIMDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Checkout and ESIM Dashboard */}
        <Route path="/esim-dashboard" element={
          <ProtectedRoute>
            <ESIMDashboard />
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
