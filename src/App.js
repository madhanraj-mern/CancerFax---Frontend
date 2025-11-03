import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HospitalListing from './pages/HospitalListing';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import DynamicPage from './pages/DynamicPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Reserved routes - must come before dynamic route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/hospitals" element={<HospitalListing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        
        {/* Dynamic route for all Strapi pages (must be last) */}
        {/* This will match /about-us, /any-slug, etc. */}
        <Route path="/:slug" element={<DynamicPage />} />
      </Routes>
    </div>
  );
}

export default App;
