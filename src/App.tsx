import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Homepage } from './components/Homepage';
import { AuthProvider } from './components/AuthProvider';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'home'>('landing');

  const handleGetStarted = () => {
    setCurrentPage('home');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  return (
    <AuthProvider>
      <div className="min-h-screen">
        {currentPage === 'landing' ? (
          <LandingPage onGetStarted={handleGetStarted} />
        ) : (
          <Homepage onBackToLanding={handleBackToLanding} />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;