import { Waves, Bike, Footprints } from 'lucide-react';

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

interface WeeklySummaryProps {
  week: (Date | null)[];
  workouts: Workout[];
}

export default function WeeklySummary({ week, workouts }: WeeklySummaryProps) {
  const getWeekWorkouts = () => {
    const weekDates = week
      .filter((d): d is Date => d !== null)
      .map(d => d.toISOString().split('T')[0]);

    return workouts.filter(w => weekDates.includes(w.workout_date));
  };

  const weekWorkouts = getWeekWorkouts();

  const getDisciplineStats = (discipline: string) => {
    const disciplineWorkouts = weekWorkouts.filter(
      w => w.discipline.toLowerCase() === discipline && w.completed
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

  const totalDuration = swimStats.duration + bikeStats.duration + runStats.duration;
  const totalDistance = swimStats.distance + bikeStats.distance + runStats.distance;

  if (weekWorkouts.length === 0) {
    return null;
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  return (
    <div className="bg-gray-50 border-b border-gray-200 p-3">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          {swimStats.count > 0 && (
            <div className="flex items-center gap-1.5">
              <Waves className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">
                {swimStats.count}x • {formatDuration(swimStats.duration)}
                {swimStats.distance > 0 && <> • {swimStats.distance}km</>}
              </span>
            </div>
          )}

          {bikeStats.count > 0 && (
            <div className="flex items-center gap-1.5">
              <Bike className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">
                {bikeStats.count}x • {formatDuration(bikeStats.duration)}
                {bikeStats.distance > 0 && <> • {bikeStats.distance}km</>}
              </span>
            </div>
          )}

          {runStats.count > 0 && (
            <div className="flex items-center gap-1.5">
              <Footprints className="w-4 h-4 text-orange-600" />
              <span className="text-gray-700">
                {runStats.count}x • {formatDuration(runStats.duration)}
                {runStats.distance > 0 && <> • {runStats.distance}km</>}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-gray-600 font-medium">
          <span>Week Total: {formatDuration(totalDuration)}</span>
          {totalDistance > 0 && <span>• {totalDistance}km</span>}
        </div>
      </div>
    </div>
  );
}
