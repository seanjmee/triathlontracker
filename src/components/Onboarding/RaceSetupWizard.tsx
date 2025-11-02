import { useState } from 'react';
import { Calendar, MapPin, Target, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface RaceSetupWizardProps {
  onComplete: () => void;
}

export default function RaceSetupWizard({ onComplete }: RaceSetupWizardProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [raceName, setRaceName] = useState('');
  const [raceDate, setRaceDate] = useState('');
  const [raceLocation, setRaceLocation] = useState('');
  const [distanceType, setDistanceType] = useState('70.3');
  const [goalTime, setGoalTime] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('intermediate');

  const handleSubmit = async () => {
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const goalMinutes = goalTime ? parseInt(goalTime) * 60 : null;

      const { data: raceData, error: raceError } = await supabase
        .from('user_races')
        .insert({
          user_id: user.id,
          race_name: raceName,
          race_date: raceDate,
          race_location: raceLocation,
          distance_type: distanceType,
          goal_finish_time_minutes: goalMinutes,
          is_primary: true,
        })
        .select()
        .single();

      if (raceError) throw raceError;

      await supabase
        .from('profiles')
        .update({ experience_level: experienceLevel })
        .eq('id', user.id);

      await supabase
        .from('athlete_metrics')
        .insert({
          user_id: user.id,
        });

      const raceDateTime = new Date(raceDate);
      const today = new Date();
      const weeksUntilRace = Math.ceil((raceDateTime.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 7));
      const planStartDate = new Date();
      const planEndDate = new Date(raceDate);
      planEndDate.setDate(planEndDate.getDate() - 7);

      await supabase
        .from('training_plans')
        .insert({
          user_id: user.id,
          race_id: raceData.id,
          plan_name: `${raceName} Training Plan`,
          start_date: planStartDate.toISOString().split('T')[0],
          end_date: planEndDate.toISOString().split('T')[0],
          weeks_duration: weeksUntilRace,
          plan_type: experienceLevel,
        });

      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create race');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Set Up Your Race</h2>
            <span className="text-sm text-gray-500">Step {step} of 3</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${
                  s <= step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Race Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Race Name
                  </label>
                  <input
                    type="text"
                    value={raceName}
                    onChange={(e) => setRaceName(e.target.value)}
                    placeholder="e.g., Ironman 70.3 Florida"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Race Date
                  </label>
                  <input
                    type="date"
                    value={raceDate}
                    onChange={(e) => setRaceDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={raceLocation}
                    onChange={(e) => setRaceLocation(e.target.value)}
                    placeholder="e.g., Miami, FL"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Race Type & Goals</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distance Type
                  </label>
                  <select
                    value={distanceType}
                    onChange={(e) => setDistanceType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="sprint">Sprint (750m / 20km / 5km)</option>
                    <option value="olympic">Olympic (1.5km / 40km / 10km)</option>
                    <option value="70.3">Half Ironman 70.3 (1.9km / 90km / 21.1km)</option>
                    <option value="ironman">Full Ironman (3.8km / 180km / 42.2km)</option>
                    <option value="custom">Custom Distance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Target className="w-4 h-4 inline mr-1" />
                    Goal Finish Time (optional)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={goalTime}
                      onChange={(e) => setGoalTime(e.target.value)}
                      placeholder="5"
                      min="0"
                      className="w-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-gray-600">hours</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Your target completion time for this race
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Experience Level</h3>
              <div className="space-y-3">
                {[
                  { value: 'beginner', label: 'Beginner', desc: 'New to triathlons or endurance training' },
                  { value: 'intermediate', label: 'Intermediate', desc: 'Completed 1-3 triathlons, regular training' },
                  { value: 'advanced', label: 'Advanced', desc: '4+ triathlons, experienced with structured training' },
                ].map((level) => (
                  <label
                    key={level.value}
                    className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      experienceLevel === level.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="experience"
                      value={level.value}
                      checked={experienceLevel === level.value}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{level.label}</div>
                      <div className="text-sm text-gray-600">{level.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && (!raceName || !raceDate)}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              {loading ? 'Creating...' : 'Complete Setup'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
