import React, { useState } from 'react';
import { PartnerWithUs } from './PartnerWithUs';
import { PartnerLogin } from './PartnerLogin';
import { PartnerRegistration } from './PartnerRegistration';
import { PartnerDashboard } from './PartnerDashboard';

interface PartnerFlowProps {
  onBack: () => void;
}

type FlowState = 'selection' | 'login' | 'register' | 'dashboard';
type PartnerType = 'driver' | 'guide' | 'artisan';

interface PartnerData {
  email: string;
  name: string;
  id: string;
  type: PartnerType;
}

export function PartnerFlow({ onBack }: PartnerFlowProps) {
  const [currentFlow, setCurrentFlow] = useState<FlowState>('selection');
  const [selectedPartnerType, setSelectedPartnerType] = useState<PartnerType | null>(null);
  const [partnerData, setPartnerData] = useState<PartnerData | null>(null);

  const handlePartnerTypeSelect = (type: PartnerType) => {
    setSelectedPartnerType(type);
    setCurrentFlow('login');
  };

  const handleLogin = (partnerType: PartnerType, userData: PartnerData) => {
    setPartnerData(userData);
    setCurrentFlow('dashboard');
  };

  const handleRegister = (partnerType: PartnerType) => {
    setSelectedPartnerType(partnerType);
    setCurrentFlow('register');
  };

  const handleRegistrationComplete = () => {
    // After successful registration, go back to login
    setCurrentFlow('login');
  };

  const handleLogout = () => {
    setPartnerData(null);
    setSelectedPartnerType(null);
    setCurrentFlow('selection');
  };

  const handleBackToSelection = () => {
    setSelectedPartnerType(null);
    setCurrentFlow('selection');
  };

  if (currentFlow === 'selection') {
    return (
      <PartnerWithUs 
        onPartnerTypeSelect={handlePartnerTypeSelect}
        onBack={onBack}
      />
    );
  }

  if (currentFlow === 'login' && selectedPartnerType) {
    return (
      <PartnerLogin
        partnerType={selectedPartnerType}
        onBack={handleBackToSelection}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    );
  }

  if (currentFlow === 'register' && selectedPartnerType) {
    return (
      <PartnerRegistration
        onBack={() => setCurrentFlow('login')}
      />
    );
  }

  if (currentFlow === 'dashboard' && partnerData) {
    return (
      <PartnerDashboard
        partnerData={partnerData}
        onLogout={handleLogout}
      />
    );
  }

  // Fallback - should not reach here
  return (
    <PartnerWithUs 
      onPartnerTypeSelect={handlePartnerTypeSelect}
      onBack={onBack}
    />
  );
}