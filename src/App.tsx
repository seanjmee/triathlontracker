import { useEffect, useState, createContext, useContext } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/Auth/AuthPage';
import RaceSetupWizard from './components/Onboarding/RaceSetupWizard';
import Dashboard from './components/Dashboard/Dashboard';
import CalendarPage from './components/Calendar/CalendarPage';
import SettingsPage from './components/Settings/SettingsPage';
import { supabase } from './lib/supabase';

type Page = 'dashboard' | 'calendar' | 'settings';

interface NavigationContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}

function AppContent() {
  const { user, loading } = useAuth();
  const [hasRace, setHasRace] = useState<boolean | null>(null);
  const [checkingRace, setCheckingRace] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  useEffect(() => {
    if (user) {
      checkForRace();
    } else {
      setCheckingRace(false);
    }
  }, [user]);

  const checkForRace = async () => {
    const { data } = await supabase
      .from('user_races')
      .select('id')
      .eq('user_id', user!.id)
      .maybeSingle();

    setHasRace(!!data);
    setCheckingRace(false);
  };

  if (loading || checkingRace) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  if (hasRace === false) {
    return <RaceSetupWizard onComplete={() => setHasRace(true)} />;
  }

  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'calendar' && <CalendarPage />}
      {currentPage === 'settings' && <SettingsPage />}
    </NavigationContext.Provider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
