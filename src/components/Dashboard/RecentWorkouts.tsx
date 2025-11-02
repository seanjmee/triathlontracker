import { useEffect, useState } from 'react';
import { Clock, TrendingUp, Activity, Droplets, Bike, Footprints } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface CompletedWorkout {
  id: string;
  workout_date: string;
  discipline: string;
  actual_duration_minutes: number;
  actual_distance_meters: number | null;
  feeling: string | null;
}

export default function RecentWorkouts() {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<CompletedWorkout[]>([]);

  useEffect(() => {
    if (user) {
      loadRecentWorkouts();
    }
  }, [user]);

  const loadRecentWorkouts = async () => {
    const { data } = await supabase
      .from('completed_workouts')
      .select('*')
      .eq('user_id', user!.id)
      .order('workout_date', { ascending: false })
      .limit(5);

    setWorkouts(data || []);
  };

  const getDisciplineIcon = (discipline: string) => {
    const icons: { [key: string]: JSX.Element } = {
      swim: <Droplets className="w-4 h-4" />,
      bike: <Bike className="w-4 h-4" />,
      run: <Footprints className="w-4 h-4" />,
    };
    return icons[discipline.toLowerCase()] || <Activity className="w-4 h-4" />;
  };

  const getDisciplineGradient = (discipline: string) => {
    const gradients: { [key: string]: string } = {
      swim: 'gradient-swim',
      bike: 'gradient-bike',
      run: 'gradient-run',
      brick: 'gradient-brick',
      strength: 'bg-slate-600',
    };
    return gradients[discipline.toLowerCase()] || 'bg-slate-600';
  };

  const formatDistance = (meters: number | null) => {
    if (!meters) return '';
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)}km`;
    }
    return `${meters}m`;
  };

  const getFeelingEmoji = (feeling: string | null) => {
    const emojis: { [key: string]: string } = {
      great: '💪',
      good: '👍',
      okay: '😐',
      tired: '😓',
      exhausted: '😵',
    };
    return feeling ? emojis[feeling] : '';
  };

  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
        <Activity className="w-5 h-5 text-slate-400" />
      </div>

      <div className="space-y-3">
        {workouts.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
            <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium mb-1">No workouts yet</p>
            <p className="text-sm text-slate-400">Complete your first workout!</p>
          </div>
        ) : (
          workouts.map((workout) => (
            <div key={workout.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg ${getDisciplineGradient(workout.discipline)} flex items-center justify-center flex-shrink-0 text-white`}>
                  {getDisciplineIcon(workout.discipline)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-slate-900 capitalize">
                      {workout.discipline}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {new Date(workout.workout_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium">{workout.actual_duration_minutes}min</span>
                    </div>
                    {workout.actual_distance_meters && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium">{formatDistance(workout.actual_distance_meters)}</span>
                      </div>
                    )}
                    {workout.feeling && (
                      <span className="text-sm">{getFeelingEmoji(workout.feeling)}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
