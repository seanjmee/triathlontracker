import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import DashboardHeader from './DashboardHeader';
import RaceCountdown from './RaceCountdown';
import WeekOverview from './WeekOverview';
import QuickStats from './QuickStats';
import RecentWorkouts from './RecentWorkouts';
import WeeklyChart from './WeeklyChart';

interface Race {
  id: string;
  race_name: string;
  race_date: string;
  race_location: string;
  distance_type: string;
  goal_finish_time_minutes: number | null;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [primaryRace, setPrimaryRace] = useState<Race | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPrimaryRace();
    }
  }, [user]);

  const loadPrimaryRace = async () => {
    const { data, error } = await supabase
      .from('user_races')
      .select('*')
      .eq('user_id', user!.id)
      .eq('is_primary', true)
      .maybeSingle();

    if (!error && data) {
      setPrimaryRace(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-slate-300 border-t-cyan-600 rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {primaryRace && (
          <div className="mb-6">
            <RaceCountdown race={primaryRace} />
          </div>
        )}

        <QuickStats />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <WeekOverview />
          </div>
          <div className="space-y-6">
            <WeeklyChart />
            <RecentWorkouts />
          </div>
        </div>
      </main>
    </div>
  );
}
