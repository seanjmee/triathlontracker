import { useEffect, useState } from 'react';
import { Plus, CheckCircle2, Circle, ChevronLeft, ChevronRight, Edit2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import AddWorkoutModal from '../Workouts/AddWorkoutModal';
import EditWorkoutModal from '../Workouts/EditWorkoutModal';
import { formatDateForDB } from '../../lib/dateUtils';

interface PlannedWorkout {
  id: string;
  workout_date: string;
  discipline: string;
  workout_type: string | null;
  planned_duration_minutes: number | null;
  planned_distance_meters: number | null;
  description: string | null;
  notes?: string | null;
  completed?: boolean;
}

export default function WeekOverview() {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<PlannedWorkout[]>([]);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<PlannedWorkout | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    if (user) {
      loadWeekWorkouts();
    }
  }, [user, weekOffset]);

  const loadWeekWorkouts = async () => {
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    startOfWeek.setDate(today.getDate() - today.getDay() + (weekOffset * 7));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startDateStr = formatDateForDB(startOfWeek);
    const endDateStr = formatDateForDB(endOfWeek);

    const { data: planned } = await supabase
      .from('planned_workouts')
      .select('*')
      .eq('user_id', user!.id)
      .gte('workout_date', startDateStr)
      .lte('workout_date', endDateStr)
      .order('workout_date');

    const { data: completed } = await supabase
      .from('completed_workouts')
      .select('*')
      .eq('user_id', user!.id)
      .gte('workout_date', startDateStr)
      .lte('workout_date', endDateStr);

    const completedMap = new Map(completed?.map(c => [c.planned_workout_id, c]) || []);
    const allWorkouts: PlannedWorkout[] = [];

    planned?.forEach(p => {
      const comp = completedMap.get(p.id);
      allWorkouts.push({
        ...p,
        completed: !!comp,
      });
      if (comp) {
        completedMap.delete(p.id);
      }
    });

    completedMap.forEach(c => {
      if (c.planned_workout_id === null) {
        allWorkouts.push({
          id: c.id,
          workout_date: c.workout_date,
          discipline: c.discipline,
          workout_type: null,
          planned_duration_minutes: c.actual_duration_minutes,
          planned_distance_meters: c.actual_distance_meters,
          description: c.notes || null,
          notes: c.notes || null,
          completed: true,
        });
      }
    });

    allWorkouts.sort((a, b) => a.workout_date.localeCompare(b.workout_date));

    setWorkouts(allWorkouts);
  };

  const getDisciplineColor = (discipline: string) => {
    const colors: { [key: string]: string } = {
      swim: 'bg-blue-100 text-blue-700 border-blue-200',
      bike: 'bg-green-100 text-green-700 border-green-200',
      run: 'bg-orange-100 text-orange-700 border-orange-200',
      brick: 'bg-purple-100 text-purple-700 border-purple-200',
      strength: 'bg-gray-100 text-gray-700 border-gray-200',
      rest: 'bg-teal-100 text-teal-700 border-teal-200',
    };
    return colors[discipline.toLowerCase()] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const formatDistance = (meters: number | null) => {
    if (!meters) return '';
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)}km`;
    }
    return `${meters}m`;
  };

  const getWeekDays = () => {
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    startOfWeek.setDate(today.getDate() - today.getDay() + (weekOffset * 7));

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  const getWeekLabel = () => {
    if (weekOffset === 0) return 'This Week';
    if (weekOffset === 1) return 'Next Week';
    if (weekOffset === -1) return 'Last Week';
    const weekDays = getWeekDays();
    const startDate = weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endDate = weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${startDate} - ${endDate}`;
  };

  const weekDays = getWeekDays();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleEditSuccess = () => {
    loadWeekWorkouts();
    setEditingWorkout(null);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setWeekOffset(weekOffset - 1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Previous week"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900">{getWeekLabel()}</h3>
          <button
            onClick={() => setWeekOffset(weekOffset + 1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Next week"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          {weekOffset !== 0 && (
            <button
              onClick={() => setWeekOffset(0)}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Today
            </button>
          )}
        </div>
        <button
          onClick={() => setShowAddWorkout(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Workout
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day, i) => {
          const dateStr = formatDateForDB(day);
          const dayWorkouts = workouts.filter(w => w.workout_date === dateStr);
          const today = new Date();
          const isToday = day.getFullYear() === today.getFullYear() &&
                         day.getMonth() === today.getMonth() &&
                         day.getDate() === today.getDate();

          return (
            <div
              key={i}
              className={`text-center p-2 rounded-lg ${
                isToday ? 'bg-blue-50 border-2 border-blue-500' : 'border border-gray-200'
              }`}
            >
              <p className="text-xs text-gray-500">{dayNames[i]}</p>
              <p className={`text-lg font-semibold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                {day.getDate()}
              </p>
              {dayWorkouts.length > 0 && (
                <div className="mt-1 flex justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {workouts.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No workouts scheduled this week. Click "Add Workout" to get started!
          </p>
        ) : (
          workouts.map((workout) => (
            <button
              key={workout.id}
              onClick={() => !workout.completed && setEditingWorkout(workout)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                workout.completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer'
              }`}
              disabled={workout.completed}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {workout.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getDisciplineColor(workout.discipline)}`}>
                      {workout.discipline}
                    </span>
                    <span className="text-sm text-gray-600">
                      {new Date(workout.workout_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">
                    {workout.description || workout.workout_type || 'Workout'}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    {workout.planned_duration_minutes && (
                      <span>{workout.planned_duration_minutes} min</span>
                    )}
                    {workout.planned_distance_meters && (
                      <span>{formatDistance(workout.planned_distance_meters)}</span>
                    )}
                  </div>
                </div>
                {!workout.completed && (
                  <Edit2 className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                )}
              </div>
            </button>
          ))
        )}
      </div>

      <AddWorkoutModal
        isOpen={showAddWorkout}
        onClose={() => setShowAddWorkout(false)}
        onSuccess={loadWeekWorkouts}
        mode="planned"
      />

      <EditWorkoutModal
        isOpen={!!editingWorkout}
        onClose={() => setEditingWorkout(null)}
        onSuccess={handleEditSuccess}
        workout={editingWorkout}
      />
    </div>
  );
}
