// 🚀 GTS Platform Main Entry Point - FSD Migration
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ Now uses FSD App via proxy
import '@/shared/styles/globals.css';

// Error boundary для отлова ошибок
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('GTS App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#0B0B0C',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '500px', padding: '20px' }}>
            <h1 style={{ color: '#91040C', marginBottom: '20px' }}>Ошибка приложения</h1>
            <p style={{ color: '#A6A7AA', marginBottom: '20px' }}>
              Произошла ошибка при загрузке приложения GTS
            </p>
            <details style={{ 
              background: '#121214', 
              padding: '10px', 
              borderRadius: '5px',
              marginBottom: '20px',
              textAlign: 'left'
            }}>
              <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>
                Техническая информация
              </summary>
              <pre style={{ 
                fontSize: '12px', 
                color: '#A6A7AA', 
                overflow: 'auto',
                whiteSpace: 'pre-wrap'
              }}>
                {this.state.error?.toString()}
              </pre>
            </details>
            <button 
              onClick={() => window.location.reload()}
              style={{
                background: '#91040C',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Перезагрузить страницу
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Функция инициализации приложения
function initializeApp() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('❌ Root element not found');
    return;
  }

  console.log('🚀 Initializing GTS Platform...');
  
  try {
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    
    console.log('✅ GTS Platform initialized successfully');
    
  } catch (error) {
    console.error('❌ Failed to initialize GTS Platform:', error);
    
    // Fallback rendering
    rootElement.innerHTML = `
      <div style="
        position: fixed; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        background: #0B0B0C; 
        color: #fff; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-family: Arial, sans-serif;
      ">
        <div style="text-align: center;">
          <h1 style="color: #91040C; margin-bottom: 20px;">Критическая ошибка</h1>
          <p style="color: #A6A7AA; margin-bottom: 20px;">
            Не удалось инициализировать приложение GTS
          </p>
          <p style="color: #A6A7AA; font-size: 14px;">
            Проверьте консоль браузера для получения подробной информации
          </p>
          <button 
            onclick="window.location.reload()" 
            style="
              background: #91040C; 
              color: white; 
              border: none; 
              padding: 10px 20px; 
              border-radius: 5px; 
              cursor: pointer; 
              margin-top: 20px;
            "
          >
            Попробовать снова
          </button>
        </div>
      </div>
    `;
  }
}

// Инициализация когда DOM готов
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Глобальная обработка ошибок
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

export default App;