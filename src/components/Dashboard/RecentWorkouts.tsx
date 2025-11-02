import { useEffect, useState } from 'react';
import { Clock, TrendingUp } from 'lucide-react';
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

  const getDisciplineColor = (discipline: string) => {
    const colors: { [key: string]: string } = {
      swim: 'bg-blue-100 text-blue-700',
      bike: 'bg-green-100 text-green-700',
      run: 'bg-orange-100 text-orange-700',
      brick: 'bg-purple-100 text-purple-700',
      strength: 'bg-gray-100 text-gray-700',
    };
    return colors[discipline.toLowerCase()] || 'bg-gray-100 text-gray-700';
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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>

      <div className="space-y-3">
        {workouts.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No workouts logged yet. Complete your first workout to see it here!
          </p>
        ) : (
          workouts.map((workout) => (
            <div key={workout.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDisciplineColor(workout.discipline)}`}>
                  {workout.discipline}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(workout.workout_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{workout.actual_duration_minutes}m</span>
                </div>
                {workout.actual_distance_meters && (
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{formatDistance(workout.actual_distance_meters)}</span>
                  </div>
                )}
                {workout.feeling && (
                  <span>{getFeelingEmoji(workout.feeling)}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
