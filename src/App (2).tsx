import React, { useState } from 'react';
import { GTSLandingPage } from './components/pages/GTSLandingPage';
import { GTSUnifiedLogin } from './components/admin/GTSUnifiedLogin';
import { GTSExecutivePanel } from './components/admin/GTSExecutivePanel';
import { GTSClientClubPortal } from './components/admin/GTSClientClubPortal';
import { GTSPartnerPortalUnified } from './components/admin/GTSPartnerPortalUnified';
import { GTSB2BPortal } from './components/admin/GTSB2BPortal';
import { GTSCrewApp } from './components/admin/GTSCrewApp';
import { GTSArchitectureDiagram } from './components/admin/modules/GTSArchitectureDiagram';

export type UserRole = 'visitor' | 'executive' | 'manager' | 'dispatcher' | 'operator' | 'sales' |
  'captain' | 'pilot' | 'guide' | 'mechanic' | 'agent' | 'contractor' | 'brand-partner' | 
  'member-bronze' | 'member-silver' | 'member-gold' | 'member-platinum' | 
  'b2b-client' | 'corporate-manager' | 'company-admin' | 'accountant';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  permissions: string[];
}

type ViewMode = 'landing' | 'login' | 'dashboard' | 'architecture';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setViewMode('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setViewMode('landing');
  };

  const handleBackToHome = () => {
    setViewMode('landing');
  };

  const handleViewArchitecture = () => {
    setViewMode('architecture');
  };

  const mockUser: User = {
    id: '1',
    name: 'Алексей Иванов',
    email: 'alex@gts.ru',
    role: 'executive',
    permissions: ['admin', 'analytics', 'finance', 'crm', 'calendar', 'staff', 'fleet']
  };

  if (viewMode === 'architecture') {
    return (
      <GTSArchitectureDiagram onBack={() => setViewMode('landing')} />
    );
  }

  if (viewMode === 'landing') {
    return (
      <div>
        <GTSLandingPage onLoginClick={() => setViewMode('login')} />
        
        {/* Floating Architecture Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleViewArchitecture}
            className="bg-[#91040C] hover:bg-[#7a0309] text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            Архитектура
          </button>
        </div>
      </div>
    );
  }

  if (viewMode === 'login') {
    return (
      <GTSUnifiedLogin
        onLogin={handleLogin}
        onBack={handleBackToHome}
      />
    );
  }

  if (viewMode === 'dashboard' && user) {
    // Routing based on user role
    switch (user.role) {
      case 'executive':
      case 'manager':
      case 'accountant':
        return (
          <GTSExecutivePanel
            user={user}
            onLogout={handleLogout}
            onBackToHome={handleBackToHome}
          />
        );
      
      case 'member-bronze':
      case 'member-silver':
      case 'member-gold':
      case 'member-platinum':
        return (
          <GTSClientClubPortal
            user={user}
            onLogout={handleLogout}
            onBackToHome={handleBackToHome}
          />
        );
      
      case 'agent':
      case 'contractor':
      case 'brand-partner':
        return (
          <GTSPartnerPortalUnified
            user={user}
            onLogout={handleLogout}
            onBackToHome={handleBackToHome}
          />
        );
      
      case 'b2b-client':
      case 'corporate-manager':
      case 'company-admin':
        return (
          <GTSB2BPortal
            user={user}
            onLogout={handleLogout}
            onBackToHome={handleBackToHome}
          />
        );
      
      case 'captain':
      case 'pilot':
      case 'guide':
      case 'mechanic':
        return (
          <GTSCrewApp
            user={user}
            onLogout={handleLogout}
            onBackToHome={handleBackToHome}
          />
        );
      
      default:
        return (
          <GTSExecutivePanel
            user={mockUser}
            onLogout={handleLogout}
            onBackToHome={handleBackToHome}
          />
        );
    }
  }

  return (
    <GTSLandingPage onLoginClick={() => setViewMode('login')} />
  );
}

export default App;