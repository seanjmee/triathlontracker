import { useState } from 'react';
import { X, Plus, CheckCircle2, Circle, Clock, TrendingUp, Heart, Activity, Trash2 } from 'lucide-react';
import AddWorkoutModal from '../Workouts/AddWorkoutModal';
import { parseDBDate } from '../../lib/dateUtils';
import { supabase } from '../../lib/supabase';

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

interface DayDetailModalProps {
  date: string;
  workouts: Workout[];
  onClose: () => void;
  onRefresh: () => void;
}

export default function DayDetailModal({ date, workouts, onClose, onRefresh }: DayDetailModalProps) {
  const [showAddPlanned, setShowAddPlanned] = useState(false);
  const [showAddCompleted, setShowAddCompleted] = useState(false);

  const dateObj = parseDBDate(date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const completedWorkouts = workouts.filter(w => w.completed);
  const plannedWorkouts = workouts.filter(w => !w.completed);

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

  const formatDistance = (meters: number | undefined) => {
    if (!meters) return null;
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)}km`;
    }
    return `${meters}m`;
  };

  const totalDuration = completedWorkouts.reduce(
    (sum, w) => sum + (w.actual_duration_minutes || 0),
    0
  );

  const totalDistance = completedWorkouts.reduce(
    (sum, w) => sum + (w.actual_distance_meters || 0),
    0
  );

  const handleSuccess = () => {
    onRefresh();
    setShowAddPlanned(false);
    setShowAddCompleted(false);
  };

  const handleDeleteCompleted = async (workoutId: string) => {
    if (!confirm('Are you sure you want to delete this completed workout?')) return;

    try {
      const { error } = await supabase
        .from('completed_workouts')
        .delete()
        .eq('id', workoutId);

      if (error) throw error;

      onRefresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete workout');
    }
  };

  const handleDeletePlanned = async (workoutId: string) => {
    if (!confirm('Are you sure you want to delete this planned workout?')) return;

    try {
      const { error } = await supabase
        .from('planned_workouts')
        .delete()
        .eq('id', workoutId);

      if (error) throw error;

      onRefresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete workout');
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{formattedDate}</h2>
              {workouts.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  {completedWorkouts.length} completed • {plannedWorkouts.length} planned
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="p-6">
            {workouts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No workouts scheduled for this day</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setShowAddPlanned(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Plan Workout
                  </button>
                  <button
                    onClick={() => setShowAddCompleted(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Log Workout
                  </button>
                </div>
              </div>
            ) : (
              <>
                {completedWorkouts.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Completed Workouts
                      </h3>
                      <button
                        onClick={() => setShowAddCompleted(true)}
                        className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Log
                      </button>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 mb-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="text-xl font-bold text-gray-900">
                            {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Distance</p>
                          <p className="text-xl font-bold text-gray-900">
                            {(totalDistance / 1000).toFixed(1)}km
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Workouts</p>
                          <p className="text-xl font-bold text-gray-900">
                            {completedWorkouts.length}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {completedWorkouts.map((workout) => (
                        <div
                          key={workout.id}
                          className="p-4 bg-green-50 border-2 border-green-200 rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span
                              className={`px-3 py-1 rounded-lg text-sm font-medium border-2 ${getDisciplineColor(
                                workout.discipline
                              )}`}
                            >
                              {workout.discipline}
                            </span>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                              <button
                                onClick={() => handleDeleteCompleted(workout.id)}
                                className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                                title="Delete workout"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 mt-3">
                            {workout.actual_duration_minutes && (
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span>{workout.actual_duration_minutes} min</span>
                              </div>
                            )}
                            {workout.actual_distance_meters && (
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <TrendingUp className="w-4 h-4 text-gray-500" />
                                <span>{formatDistance(workout.actual_distance_meters)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {plannedWorkouts.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Circle className="w-5 h-5 text-gray-400" />
                        Planned Workouts
                      </h3>
                      <button
                        onClick={() => setShowAddPlanned(true)}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Plan
                      </button>
                    </div>

                    <div className="space-y-3">
                      {plannedWorkouts.map((workout) => (
                        <div
                          key={workout.id}
                          className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span
                              className={`px-3 py-1 rounded-lg text-sm font-medium border-2 ${getDisciplineColor(
                                workout.discipline
                              )}`}
                            >
                              {workout.discipline}
                            </span>
                            <div className="flex items-center gap-2">
                              <Circle className="w-5 h-5 text-gray-400" />
                              <button
                                onClick={() => handleDeletePlanned(workout.id)}
                                className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                                title="Delete workout"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 mt-3">
                            {workout.planned_duration_minutes && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span>{workout.planned_duration_minutes} min</span>
                              </div>
                            )}
                            {workout.planned_distance_meters && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <TrendingUp className="w-4 h-4 text-gray-400" />
                                <span>{formatDistance(workout.planned_distance_meters)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <AddWorkoutModal
        isOpen={showAddPlanned}
        onClose={() => setShowAddPlanned(false)}
        onSuccess={handleSuccess}
        mode="planned"
      />

      <AddWorkoutModal
        isOpen={showAddCompleted}
        onClose={() => setShowAddCompleted(false)}
        onSuccess={handleSuccess}
        mode="completed"
      />
    </>
  );
}
