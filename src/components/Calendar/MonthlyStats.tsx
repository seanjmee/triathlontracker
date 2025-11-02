import { Waves, Bike, Footprints, Activity, TrendingUp } from 'lucide-react';

interface Workout {
  id: string;
  workout_date: string;
  discipline: string;
  actual_duration_minutes?: number;
  actual_distance_meters?: number;
  planned_duration_minutes?: number;
  planned_distance_meters?: number;
  completed: boolean;
}

interface MonthlyStatsProps {
  workouts: Workout[];
  currentDate: Date;
}

export default function MonthlyStats({ workouts, currentDate }: MonthlyStatsProps) {
  const completedWorkouts = workouts.filter(w => w.completed);

  const getDisciplineStats = (discipline: string) => {
    const disciplineWorkouts = completedWorkouts.filter(
      w => w.discipline.toLowerCase() === discipline
    );

    const totalDuration = disciplineWorkouts.reduce(
      (sum, w) => sum + (w.actual_duration_minutes || 0),
      0
    );

    const totalDistance = disciplineWorkouts.reduce(
      (sum, w) => sum + (w.actual_distance_meters || 0),
      0
    );

    return {
      count: disciplineWorkouts.length,
      duration: totalDuration,
      distance: Math.round(totalDistance / 1000 * 10) / 10,
    };
  };

  const swimStats = getDisciplineStats('swim');
  const bikeStats = getDisciplineStats('bike');
  const runStats = getDisciplineStats('run');

  const totalDuration = completedWorkouts.reduce(
    (sum, w) => sum + (w.actual_duration_minutes || 0),
    0
  );

  const totalDistance = completedWorkouts.reduce(
    (sum, w) => sum + (w.actual_distance_meters || 0),
    0
  );

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Waves className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-600">Swim</p>
            <p className="text-lg font-bold text-gray-900">{swimStats.count}</p>
            <p className="text-xs text-gray-500">
              {formatDuration(swimStats.duration)}
              {swimStats.distance > 0 && ` • ${swimStats.distance}km`}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Bike className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-600">Bike</p>
            <p className="text-lg font-bold text-gray-900">{bikeStats.count}</p>
            <p className="text-xs text-gray-500">
              {formatDuration(bikeStats.duration)}
              {bikeStats.distance > 0 && ` • ${bikeStats.distance}km`}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Footprints className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="text-xs text-gray-600">Run</p>
            <p className="text-lg font-bold text-gray-900">{runStats.count}</p>
            <p className="text-xs text-gray-500">
              {formatDuration(runStats.duration)}
              {runStats.distance > 0 && ` • ${runStats.distance}km`}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-xs text-gray-600">Total Workouts</p>
            <p className="text-lg font-bold text-gray-900">{completedWorkouts.length}</p>
            <p className="text-xs text-gray-500">{formatDuration(totalDuration)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <p className="text-xs text-gray-600">Total Distance</p>
            <p className="text-lg font-bold text-gray-900">
              {Math.round(totalDistance / 1000 * 10) / 10}
            </p>
            <p className="text-xs text-gray-500">kilometers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
