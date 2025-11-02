import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/Auth/AuthPage';
import RaceSetupWizard from './components/Onboarding/RaceSetupWizard';
import Dashboard from './components/Dashboard/Dashboard';
import { supabase } from './lib/supabase';

function AppContent() {
  const { user, loading } = useAuth();
  const [hasRace, setHasRace] = useState<boolean | null>(null);
  const [checkingRace, setCheckingRace] = useState(true);

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

  return <Dashboard />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
