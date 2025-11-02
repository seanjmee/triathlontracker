import { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface AddWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: 'planned' | 'completed';
  defaultDate?: string;
}

export default function AddWorkoutModal({ isOpen, onClose, onSuccess, mode, defaultDate }: AddWorkoutModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [workoutDate, setWorkoutDate] = useState(defaultDate || new Date().toISOString().split('T')[0]);
  const [discipline, setDiscipline] = useState('run');
  const [workoutType, setWorkoutType] = useState('endurance');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [description, setDescription] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [rpe, setRpe] = useState('');
  const [feeling, setFeeling] = useState('good');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isOpen && defaultDate) {
      setWorkoutDate(defaultDate);
    }
  }, [isOpen, defaultDate]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const distanceMeters = distance ? parseFloat(distance) * 1000 : null;

      if (mode === 'planned') {
        await supabase.from('planned_workouts').insert({
          user_id: user!.id,
          workout_date: workoutDate,
          discipline,
          workout_type: workoutType,
          planned_duration_minutes: duration ? parseInt(duration) : null,
          planned_distance_meters: distanceMeters,
          description,
          notes,
        });
      } else {
        await supabase.from('completed_workouts').insert({
          user_id: user!.id,
          workout_date: workoutDate,
          discipline,
          actual_duration_minutes: parseInt(duration),
          actual_distance_meters: distanceMeters,
          average_heart_rate: heartRate ? parseInt(heartRate) : null,
          rpe: rpe ? parseInt(rpe) : null,
          feeling,
          workout_notes: notes,
        });
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add workout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'planned' ? 'Plan Workout' : 'Log Workout'}
          </h2>
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
                Duration (minutes) {mode === 'completed' && <span className="text-red-500">*</span>}
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required={mode === 'completed'}
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

            {mode === 'completed' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avg Heart Rate (bpm)
                  </label>
                  <input
                    type="number"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                    min="0"
                    max="220"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RPE (1-10)
                  </label>
                  <input
                    type="number"
                    value={rpe}
                    onChange={(e) => setRpe(e.target.value)}
                    min="1"
                    max="10"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How did you feel?
                  </label>
                  <select
                    value={feeling}
                    onChange={(e) => setFeeling(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="great">Great 💪</option>
                    <option value="good">Good 👍</option>
                    <option value="okay">Okay 😐</option>
                    <option value="tired">Tired 😓</option>
                    <option value="exhausted">Exhausted 😵</option>
                  </select>
                </div>
              </>
            )}
          </div>

          {mode === 'planned' && (
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
          )}

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
              <Plus className="w-5 h-5" />
              {loading ? 'Saving...' : mode === 'planned' ? 'Plan Workout' : 'Log Workout'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
