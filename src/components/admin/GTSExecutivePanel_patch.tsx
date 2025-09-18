          {activeModule === 'crm' && (
            <GTSCRMWithOmniInbox 
              onBack={() => setActiveModule('dashboard')}
              onNavigateToCalendar={() => setActiveModule('calendar')}
            />
          )}

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
        </div>
      </div>
    </div>
  );
}