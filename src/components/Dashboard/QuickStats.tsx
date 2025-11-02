import { useEffect, useState } from 'react';
import { TrendingUp, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function QuickStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    thisWeekWorkouts: 0,
    thisWeekMinutes: 0,
    thisMonthWorkouts: 0,
  });

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const { data: weekWorkouts } = await supabase
      .from('completed_workouts')
      .select('actual_duration_minutes')
      .eq('user_id', user!.id)
      .gte('workout_date', startOfWeek.toISOString().split('T')[0]);

    const { data: monthWorkouts } = await supabase
      .from('completed_workouts')
      .select('id')
      .eq('user_id', user!.id)
      .gte('workout_date', startOfMonth.toISOString().split('T')[0]);

    const totalMinutes = weekWorkouts?.reduce((sum, w) => sum + w.actual_duration_minutes, 0) || 0;

    setStats({
      thisWeekWorkouts: weekWorkouts?.length || 0,
      thisWeekMinutes: totalMinutes,
      thisMonthWorkouts: monthWorkouts?.length || 0,
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

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">This Week</p>
            <p className="text-2xl font-bold text-gray-900">{stats.thisWeekWorkouts}</p>
            <p className="text-xs text-gray-500">workouts</p>
          </div>
          <CheckCircle className="w-8 h-8 text-blue-600" />
        </div>

        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Training Time</p>
            <p className="text-2xl font-bold text-gray-900">{formatDuration(stats.thisWeekMinutes)}</p>
            <p className="text-xs text-gray-500">this week</p>
          </div>
          <TrendingUp className="w-8 h-8 text-green-600" />
        </div>

        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-2xl font-bold text-gray-900">{stats.thisMonthWorkouts}</p>
            <p className="text-xs text-gray-500">workouts</p>
          </div>
          <TrendingUp className="w-8 h-8 text-orange-600" />
        </div>
      </div>
    </div>
  );
}
