import { useEffect, useState } from 'react';
import { Activity, TrendingUp, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function TrainingStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalDistance: 0,
    totalDuration: 0,
    avgPerWeek: 0,
  });

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    const { data: workouts } = await supabase
      .from('completed_workouts')
      .select('actual_duration_minutes, actual_distance_meters, workout_date')
      .eq('user_id', user!.id);

    if (!workouts) return;

    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce((sum, w) => sum + w.actual_duration_minutes, 0);
    const totalDistance = workouts.reduce((sum, w) => sum + (w.actual_distance_meters || 0), 0);

    const dates = workouts.map(w => new Date(w.workout_date));
    const weeks = dates.length > 0
      ? Math.ceil((Math.max(...dates.map(d => d.getTime())) - Math.min(...dates.map(d => d.getTime()))) / (1000 * 60 * 60 * 24 * 7)) || 1
      : 1;
    const avgPerWeek = totalWorkouts / weeks;

    setStats({
      totalWorkouts,
      totalDistance: Math.round(totalDistance / 1000),
      totalDuration,
      avgPerWeek: Math.round(avgPerWeek * 10) / 10,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Training Statistics</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Workouts</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalWorkouts}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Distance</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalDistance} km</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-orange-100 rounded-lg">
            <Calendar className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Time</p>
            <p className="text-2xl font-bold text-gray-900">{Math.round(stats.totalDuration / 60)}h</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Avg per Week</p>
            <p className="text-2xl font-bold text-gray-900">{stats.avgPerWeek}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
