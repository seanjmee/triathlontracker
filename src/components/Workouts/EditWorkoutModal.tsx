import { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface Workout {
  id: string;
  workout_date: string;
  discipline: string;
  workout_type?: string | null;
  planned_duration_minutes?: number | null;
  planned_distance_meters?: number | null;
  description?: string | null;
  notes?: string | null;
}

interface EditWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  workout: Workout | null;
}

export default function EditWorkoutModal({ isOpen, onClose, onSuccess, workout }: EditWorkoutModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const [workoutDate, setWorkoutDate] = useState('');
  const [discipline, setDiscipline] = useState('run');
  const [workoutType, setWorkoutType] = useState('endurance');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (workout) {
      setWorkoutDate(workout.workout_date);
      setDiscipline(workout.discipline);
      setWorkoutType(workout.workout_type || 'endurance');
      setDuration(workout.planned_duration_minutes?.toString() || '');
      setDistance(workout.planned_distance_meters ? (workout.planned_distance_meters / 1000).toString() : '');
      setDescription(workout.description || '');
      setNotes(workout.notes || '');
    }
  }, [workout]);

  if (!isOpen || !workout) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const distanceMeters = distance ? parseFloat(distance) * 1000 : null;

      const { error: updateError } = await supabase
        .from('planned_workouts')
        .update({
          workout_date: workoutDate,
          discipline,
          workout_type: workoutType,
          planned_duration_minutes: duration ? parseInt(duration) : null,
          planned_distance_meters: distanceMeters,
          description,
          notes,
        })
        .eq('id', workout.id)
        .eq('user_id', user!.id);

      if (updateError) throw updateError;

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update workout');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this workout?')) return;

    setDeleting(true);
    setError('');

    try {
      const { error: deleteError } = await supabase
        .from('planned_workouts')
        .delete()
        .eq('id', workout.id)
        .eq('user_id', user!.id);

      if (deleteError) throw deleteError;

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete workout');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Edit Workout</h2>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={workoutDate}
                onChange={(e) => setWorkoutDate(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discipline
              </label>
              <select
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="swim">Swim</option>
                <option value="bike">Bike</option>
                <option value="run">Run</option>
                <option value="brick">Brick</option>
                <option value="strength">Strength</option>
                <option value="rest">Rest</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workout Type
              </label>
              <select
                value={workoutType}
                onChange={(e) => setWorkoutType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="endurance">Endurance</option>
                <option value="tempo">Tempo</option>
                <option value="intervals">Intervals</option>
                <option value="recovery">Recovery</option>
                <option value="race_pace">Race Pace</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance (km)
              </label>
              <input
                type="number"
                step="0.1"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Easy run with 5x1min pickups"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add any additional notes..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="px-6 py-3 border-2 border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
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
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
