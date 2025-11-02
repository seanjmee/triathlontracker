import { Calendar, MapPin, Target, Trophy } from 'lucide-react';

interface Race {
  id: string;
  race_name: string;
  race_date: string;
  race_location: string;
  distance_type: string;
  goal_finish_time_minutes: number | null;
}

interface RaceCountdownProps {
  race: Race;
}

export default function RaceCountdown({ race }: RaceCountdownProps) {
  const raceDate = new Date(race.race_date);
  const today = new Date();
  const daysUntilRace = Math.ceil((raceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const weeksUntilRace = Math.floor(daysUntilRace / 7);

  const formatGoalTime = (minutes: number | null) => {
    if (!minutes) return 'Not set';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getDistanceLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'sprint': 'Sprint Distance',
      'olympic': 'Olympic Distance',
      '70.3': 'Half Ironman 70.3',
      'ironman': 'Full Ironman',
      'custom': 'Custom Distance',
    };
    return labels[type] || type;
  };

  return (
    <div className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-teal-700 rounded-xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

      <div className="relative">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-1">{race.race_name}</h2>
            <p className="text-cyan-100 font-medium">{getDistanceLabel(race.distance_type)}</p>
          </div>
          <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Trophy className="w-8 h-8 text-yellow-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-cyan-100" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-cyan-100 font-medium">Race Date</p>
              <p className="font-semibold text-sm truncate">{raceDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          {race.race_location && (
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-cyan-100" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-cyan-100 font-medium">Location</p>
                <p className="font-semibold text-sm truncate">{race.race_location}</p>
              </div>
            </div>
          )}

          {race.goal_finish_time_minutes && (
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-cyan-100" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-cyan-100 font-medium">Goal Time</p>
                <p className="font-semibold text-sm">{formatGoalTime(race.goal_finish_time_minutes)}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-5xl sm:text-6xl font-bold tracking-tight">{daysUntilRace}</p>
              <p className="text-cyan-100 mt-2 font-medium">days to go</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{weeksUntilRace}</p>
              <p className="text-sm text-cyan-100 mt-1">weeks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
