import React, { useState } from 'react';
import { Header } from './Header';
import { TrendingPlaces } from './TrendingPlaces';
import { ExplorePlaces } from './ExplorePlaces';
import { Marketplace } from './Marketplace';
import { CulturalExperience } from './CulturalExperience';
import { Feedback } from './Feedback';
import { SOSSection } from './SOSSection';
import { AITravelBot } from './AITravelBot';
import { RouteCalculator } from './RouteCalculator';
import { MyTrip } from './MyTrip';
import { PartnerFlow } from './PartnerFlow';
import { GovDashboard } from './GovDashboard';
import { useAuth } from './AuthProvider';

export type PageSection = 'home' | 'explore' | 'marketplace' | 'cultural' | 'feedback' | 'sos' | 'ai-chat' | 'route-calculator' | 'my-trip' | 'partner-flow' | 'gov-dashboard';

interface HomepageProps {
  onBackToLanding?: () => void;
}

export function Homepage({ onBackToLanding }: HomepageProps) {
  const [activeSection, setActiveSection] = useState<PageSection>('home');
  const { user } = useAuth();

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'explore':
        return <ExplorePlaces />;
      case 'marketplace':
        return <Marketplace />;
      case 'cultural':
        return <CulturalExperience />;
      case 'feedback':
        return <Feedback />;
      case 'sos':
        return <SOSSection />;
      case 'ai-chat':
        return <AITravelBot />;
      case 'route-calculator':
        return <RouteCalculator />;
      case 'my-trip':
        return <MyTrip />;
      case 'partner-flow':
        return <PartnerFlow onBack={() => setActiveSection('home')} />;
      case 'gov-dashboard':
        // Only allow access to gov dashboard if user is an authenticated admin
        if (user?.isAdmin) {
          return <GovDashboard 
            onClose={() => setActiveSection('home')} 
            onLogout={() => {
              if (onBackToLanding) {
                onBackToLanding();
              }
            }} 
          />;
        } else {
          // Redirect to home if not an admin
          setActiveSection('home');
          return (
            <div className="space-y-16">
              <TrendingPlaces />
              <ExplorePlaces />
              <Marketplace />
              <CulturalExperience />
              <SOSSection />
            </div>
          );
        }
      default:
        return (
          <div className="space-y-16">
            <TrendingPlaces />
            <ExplorePlaces />
            <Marketplace />
            <CulturalExperience />
            <SOSSection />
          </div>
        );
    }
  };

  if (activeSection === 'gov-dashboard' && user?.isAdmin) {
    return renderActiveSection();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
      />
      <main className="pt-16">
        {renderActiveSection()}
      </main>
    </div>
  );
}