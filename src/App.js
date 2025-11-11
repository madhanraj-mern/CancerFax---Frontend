import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HospitalListing from './pages/HospitalListing';
import HospitalDetails from './pages/HospitalDetails';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import DynamicPage from './pages/DynamicPage';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Reserved routes - must come before dynamic route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/hospitals" element={<HospitalListing />} />
        <Route path="/hospitaldetails" element={<HospitalDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        
        {/* Dynamic route for all Strapi pages (must come before 404) */}
        <Route path="/:slug" element={<DynamicPage />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
