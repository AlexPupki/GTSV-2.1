import React, { useState, useEffect } from "react";
import { useNavigation } from "./hooks/useNavigation";
import { GTSPageRouter } from "./components/pages/GTSPageRouter";
import { AuthProvider } from "./contexts/AuthContext";
import { GTSDemoRouter } from "./components/core/GTSDemoRouter";
import { AINavigationHelper } from "./utils/ai-navigation-map";
import { SimpleAppTest } from "./components/test/SimpleAppTest";
import { SimpleFallback } from "./components/fallback/SimpleFallback";

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

  // Handle component mount
  useEffect(() => {
    try {
      setIsLoaded(true);
      // Hide loading spinner
      if (typeof document !== 'undefined') {
        const loading = document.getElementById('loading');
        if (loading) {
          loading.style.display = 'none';
        }
        document.body.classList.add('loaded');
      }
    } catch (err) {
      console.error('App initialization error:', err);
      setError('Ошибка инициализации приложения');
    }
  }, []);

  // 🌚 FORCE DARK THEME FOR ADMIN PAGES
  const isAdminPage = React.useMemo(() => {
    const adminPages = [
      'executive-access',
      'partner-portal',
      'client-club-portal',
      'b2b-client-portal',
      'crew-app',
      'demo-center',
      'ui-kit'
    ];
    return adminPages.includes(currentPage);
  }, [currentPage]);

  // Apply dark theme to document when on admin pages
  React.useEffect(() => {
    if (isAdminPage) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    return () => {
      // Cleanup on unmount
      document.documentElement.classList.remove('dark');
    };
  }, [isAdminPage]);

  // 🤖 AI-Enhanced Navigation Handlers
  const handleNavigateToUIKit = () => setCurrentPage("ui-kit");
  const handleNavigateToDemo = () => setCurrentPage("demo");
  const handleNavigateToSphereM = () => setCurrentPage("sphere-management");
  const handleNavigateToB2BPortal = () => setCurrentPage("b2b-client-portal");
  const handleNavigateToNewLeadDemo = () => setCurrentPage("new-lead-demo");

  // 🎯 AI-Powered Demo Navigation
  const handleNavigateToDemoById = (demoId: string) => {
    console.log(`🤖 AI Navigation: Navigating to demo "${demoId}"`);
    
    // Find component info using AI helper
    const componentInfo = AINavigationHelper.findComponent(demoId);
    console.log(`🔍 Found ${componentInfo.length} matching components for "${demoId}"`);
    
    // Map demo IDs to page routes
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

  // Error boundary
  if (error) {
    return (
      <SimpleFallback 
        message={error}
        retry={() => {
          setError(null);
          setIsLoaded(false);
          window.location.reload();
        }}
      />
    );
  }

  // Show loading until component is ready
  if (!isLoaded) {
    return null;
  }

  try {
    // 🎪 Show Demo Router for demo center
    if (currentPage === "demo-center") {
      return (
        <AuthProvider>
          <GTSDemoRouter
            onNavigateToDemo={handleNavigateToDemoById}
            currentDemo={currentPage}
          />
        </AuthProvider>
      );
    }

    return (
      <AuthProvider>
        <SimpleAppTest />
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
          // 🤖 Pass AI navigation to PageRouter
          onNavigateToDemoById={handleNavigateToDemoById}
        />
      </AuthProvider>
    );
  } catch (err) {
    console.error('Render error:', err);
    setError('Ошибка отображения компонента');
    return null;
  }
}