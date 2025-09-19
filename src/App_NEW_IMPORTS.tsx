// 🚀 GTS Platform - Main App Entry Point (Modernized Imports)
// ✅ Updated version using new organized structure

import React, { useState, useEffect } from "react";
import { useNavigation } from "./hooks/useNavigation";
import { AuthProvider } from "./contexts/AuthContext";

// NEW ORGANIZED IMPORTS - using centralized structure
import { GTSPageRouter } from "./components/pages";
import { GTSDemoRouter } from "./components/layout/core";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    currentPage,
    navigationContext,
    userRole,
    setCurrentPage,
    navigateToModule,
    handleRoleSelected,
    goToHome,
    goToLogin
  } = useNavigation();

  // Initialize app
  useEffect(() => {
    try {
      setIsLoaded(true);
      document.documentElement.classList.add('dark');
    } catch (err) {
      console.error('App initialization error:', err);
      setError('Ошибка инициализации приложения');
    }
  }, []);

  // Navigation handlers
  const handleNavigateToUIKit = () => setCurrentPage("ui-kit");
  const handleNavigateToDemo = () => setCurrentPage("demo");
  const handleNavigateToSphereM = () => setCurrentPage("sphere-management");
  const handleNavigateToB2BPortal = () => setCurrentPage("b2b-client-portal");
  const handleNavigateToNewLeadDemo = () => setCurrentPage("new-lead-demo");

  const handleNavigateToDemoById = (demoId: string) => {
    console.log(`🤖 AI Navigation: Navigating to demo "${demoId}"`);
    
    const demoRoutes: Record<string, string> = {
      'executive-panel': 'executive-access',
      'crm-system': 'executive-access',
      'finance-system': 'executive-access', 
      'client-club': 'client-club-portal',
      'partner-portal': 'partner-portal',
      'b2b-portal': 'b2b-client-portal',
      'ai-assistant': 'executive-access',
      'ai-content': 'executive-access',
      'crew-app': 'crew-app',
      'booking-system': 'executive-access',
      'iam-system': 'executive-access'
    };

    const targetPage = demoRoutes[demoId] || 'demo';
    setCurrentPage(targetPage);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#0B0B0C] text-white">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-red-400">Ошибка приложения</h2>
          <p className="text-[#A6A7AA]">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#91040C] text-white rounded-md hover:bg-[#91040C]/90"
          >
            Перезагрузить
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0B0C] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#91040C] mx-auto mb-4"></div>
          <p className="text-[#A6A7AA]">Загрузка GTS Platform...</p>
        </div>
      </div>
    );
  }

  try {
    if (currentPage === "demo-center") {
      return (
        <AuthProvider>
          <div className="min-h-screen bg-[#0B0B0C] text-white dark">
            <GTSDemoRouter
              onNavigateToDemo={handleNavigateToDemoById}
              currentDemo={currentPage}
            />
          </div>
        </AuthProvider>
      );
    }

    return (
      <AuthProvider>
        <div className="min-h-screen bg-[#0B0B0C] text-white dark">
          <GTSPageRouter
            currentPage={currentPage}
            navigationContext={navigationContext}
            onRoleSelected={handleRoleSelected}
            onBackToHome={goToHome}
            onLogin={goToLogin}
            onNavigateToUIKit={handleNavigateToUIKit}
            onNavigateToDemo={handleNavigateToDemo}
            navigateToModule={navigateToModule}
            onNavigateToB2BPortal={handleNavigateToB2BPortal}
            onNavigateToNewLeadDemo={handleNavigateToNewLeadDemo}
            onNavigateToDemoById={handleNavigateToDemoById}
          />
        </div>
      </AuthProvider>
    );
  } catch (err) {
    console.error('Render error:', err);
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#0B0B0C] text-white">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-red-400">Ошибка отображения</h2>
          <p className="text-[#A6A7AA]">Произошла ошибка при отображении компонента</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#91040C] text-white rounded-md hover:bg-[#91040C]/90"
          >
            Перезагрузить
          </button>
        </div>
      </div>
    );
  }
}