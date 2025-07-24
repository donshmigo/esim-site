import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';

// Old plan pages removed
import BusinessPage from './pages/business';
import ContactPage from './pages/contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import FairUsagePolicy from './pages/FairUsagePolicy';
import Partners from './pages/Partners';
import AboutUs from './pages/AboutUs';
import DataCalculator from './pages/data-calculator';
import FreeTrial from './pages/free-trial';

// Import checkout
import Checkout from './pages/Checkout';
import ThankYou from './pages/thank-you';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/fair-usage-policy" element={<FairUsagePolicy />} />
      <Route path="/partners" element={<Partners />} />

      <Route path="/business" element={<BusinessPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/data-calculator" element={<DataCalculator />} />
      <Route path="/free-trial" element={<FreeTrial />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
