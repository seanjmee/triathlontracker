import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import DashboardHeader from './DashboardHeader';
import RaceCountdown from './RaceCountdown';
import WeekOverview from './WeekOverview';
import QuickStats from './QuickStats';
import RecentWorkouts from './RecentWorkouts';

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            {primaryRace && <RaceCountdown race={primaryRace} />}
          </div>
          <div>
            <QuickStats />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WeekOverview />
          </div>
          <div>
            <RecentWorkouts />
          </div>
        </div>
      </main>
    </div>
  );
}
