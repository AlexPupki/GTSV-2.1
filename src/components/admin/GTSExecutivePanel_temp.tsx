          {activeModule === 'quality' && (
            <GTSQualityTrendsDashboard 
              onBack={() => setActiveModule('dashboard')}
            />
          )}

          {activeModule === 'b2b-portal' && (
            <GTSB2BClientPortal 
              onBack={() => setActiveModule('dashboard')}
            />
          )}