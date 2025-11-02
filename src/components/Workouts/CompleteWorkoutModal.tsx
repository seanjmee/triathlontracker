import { useState } from 'react';
import { X, CheckCircle, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface PlannedWorkout {
  id: string;
  workout_date: string;
  discipline: string;
  workout_type?: string | null;
  planned_duration_minutes?: number | null;
  planned_distance_meters?: number | null;
  description?: string | null;
}

interface CompleteWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  workout: PlannedWorkout | null;
}

export default function CompleteWorkoutModal({ isOpen, onClose, onSuccess, workout }: CompleteWorkoutModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [actualDuration, setActualDuration] = useState('');
  const [actualDistance, setActualDistance] = useState('');
  const [avgHeartRate, setAvgHeartRate] = useState('');
  const [perceivedEffort, setPerceivedEffort] = useState('5');
  const [notes, setNotes] = useState('');

  if (!isOpen || !workout) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const distanceMeters = actualDistance ? parseFloat(actualDistance) * 1000 : null;

      const { error: insertError } = await supabase
        .from('completed_workouts')
        .insert({
          user_id: user!.id,
          planned_workout_id: workout.id,
          workout_date: workout.workout_date,
          discipline: workout.discipline,
          actual_duration_minutes: actualDuration ? parseInt(actualDuration) : null,
          actual_distance_meters: distanceMeters,
          avg_heart_rate: avgHeartRate ? parseInt(avgHeartRate) : null,
          perceived_effort: parseInt(perceivedEffort),
          notes,
        });

      if (insertError) throw insertError;

      onSuccess();
      onClose();

      setActualDuration('');
      setActualDistance('');
      setAvgHeartRate('');
      setPerceivedEffort('5');
      setNotes('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete workout');
    } finally {
      setLoading(false);
    }
  };

  const plannedDurationStr = workout.planned_duration_minutes ? `${workout.planned_duration_minutes} min` : '';
  const plannedDistanceStr = workout.planned_distance_meters ? `${(workout.planned_distance_meters / 1000).toFixed(1)} km` : '';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Complete Workout</h2>
              <p className="text-sm text-gray-600">{new Date(workout.workout_date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Planned Workout</h3>
            <div className="space-y-1 text-sm text-blue-800">
              <p><span className="font-medium">Discipline:</span> {workout.discipline}</p>
              {workout.workout_type && <p><span className="font-medium">Type:</span> {workout.workout_type}</p>}
              {workout.description && <p><span className="font-medium">Description:</span> {workout.description}</p>}
              <div className="flex gap-4 mt-2">
                {plannedDurationStr && <p><span className="font-medium">Duration:</span> {plannedDurationStr}</p>}
                {plannedDistanceStr && <p><span className="font-medium">Distance:</span> {plannedDistanceStr}</p>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Actual Duration (minutes) *
              </label>
              <input
                type="number"
                value={actualDuration}
                onChange={(e) => setActualDuration(e.target.value)}
                min="0"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={plannedDurationStr}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Actual Distance (km)
              </label>
              <input
                type="number"
                step="0.1"
                value={actualDistance}
                onChange={(e) => setActualDistance(e.target.value)}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={plannedDistanceStr}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avg Heart Rate (bpm)
              </label>
              <input
                type="number"
                value={avgHeartRate}
                onChange={(e) => setAvgHeartRate(e.target.value)}
                min="0"
                max="220"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Perceived Effort (1-10) *
              </label>
              <select
                value={perceivedEffort}
                onChange={(e) => setPerceivedEffort(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="How did it feel? Any observations?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Saving...' : 'Mark as Complete'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
