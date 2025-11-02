import { useEffect, useState } from 'react';
import { Activity, Zap, Target, Droplets, Bike, Footprints } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { formatDateForDB } from '../../lib/dateUtils';

export default function QuickStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    thisWeekWorkouts: 0,
    thisWeekMinutes: 0,
    thisWeekDistance: 0,
    thisMonthWorkouts: 0,
    swimCount: 0,
    bikeCount: 0,
    runCount: 0,
  });

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const startOfWeekStr = formatDateForDB(startOfWeek);
    const startOfMonthStr = formatDateForDB(startOfMonth);

    const { data: weekWorkouts } = await supabase
      .from('completed_workouts')
      .select('actual_duration_minutes, actual_distance_meters, discipline')
      .eq('user_id', user!.id)
      .gte('workout_date', startOfWeekStr);

    const { data: monthWorkouts } = await supabase
      .from('completed_workouts')
      .select('id')
      .eq('user_id', user!.id)
      .gte('workout_date', startOfMonthStr);

    const totalMinutes = weekWorkouts?.reduce((sum, w) => sum + w.actual_duration_minutes, 0) || 0;
    const totalDistance = weekWorkouts?.reduce((sum, w) => sum + (w.actual_distance_meters || 0), 0) || 0;

    const swimCount = weekWorkouts?.filter(w => w.discipline === 'swim').length || 0;
    const bikeCount = weekWorkouts?.filter(w => w.discipline === 'bike').length || 0;
    const runCount = weekWorkouts?.filter(w => w.discipline === 'run').length || 0;

    setStats({
      thisWeekWorkouts: weekWorkouts?.length || 0,
      thisWeekMinutes: totalMinutes,
      thisWeekDistance: totalDistance,
      thisMonthWorkouts: monthWorkouts?.length || 0,
      swimCount,
      bikeCount,
      runCount,
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatDistance = (meters: number) => {
    return (meters / 1000).toFixed(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-bold text-slate-900">This Week</h2>
        <Activity className="w-5 h-5 text-slate-400" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="metric-card">
          <div className="flex items-center justify-between mb-3">
            <Zap className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Workouts</span>
          </div>
          <p className="stat-display text-slate-900">{stats.thisWeekWorkouts}</p>
          <p className="text-xs text-slate-500 mt-1">{stats.thisMonthWorkouts} this month</p>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-3">
            <Target className="w-5 h-5 text-cyan-500" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Volume</span>
          </div>
          <p className="stat-display text-slate-900">{formatDuration(stats.thisWeekMinutes)}</p>
          <p className="text-xs text-slate-500 mt-1">{formatDistance(stats.thisWeekDistance)}km</p>
        </div>
      </div>

      <div className="metric-card">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Discipline Breakdown</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-swim flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Swim</span>
            </div>
            <span className="text-lg font-bold text-slate-900">{stats.swimCount}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-bike flex items-center justify-center">
                <Bike className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Bike</span>
            </div>
            <span className="text-lg font-bold text-slate-900">{stats.bikeCount}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-run flex items-center justify-center">
                <Footprints className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Run</span>
            </div>
            <span className="text-lg font-bold text-slate-900">{stats.runCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
