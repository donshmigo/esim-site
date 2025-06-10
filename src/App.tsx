import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';

// Import plan pages
import Plans from './pages/plans';
import LitePlan from './pages/plans/LitePlan';
import TravelerPlan from './pages/plans/TravelerPlan';
import ProPlan from './pages/plans/ProPlan';
import MaxPlan from './pages/plans/MaxPlan';
import BusinessPage from './pages/business';
import ContactPage from './pages/contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import FairUsagePolicy from './pages/FairUsagePolicy';
import Partners from './pages/Partners';
import AboutUs from './pages/AboutUs';

// Import checkout
import Checkout from './pages/Checkout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/fair-usage-policy" element={<FairUsagePolicy />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/plans/lite" element={<LitePlan />} />
      <Route path="/plans/traveler" element={<Navigate to="/plans/pro" replace />} />
      <Route path="/plans/pro" element={<ProPlan />} />
      <Route path="/plans/max" element={<MaxPlan />} />
      <Route path="/business" element={<BusinessPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
