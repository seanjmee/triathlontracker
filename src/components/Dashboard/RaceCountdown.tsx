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
    <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">{race.race_name}</h2>
          <p className="text-blue-100">{getDistanceLabel(race.distance_type)}</p>
        </div>
        <Trophy className="w-12 h-12 text-blue-200" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-200" />
          <div>
            <p className="text-sm text-blue-100">Race Date</p>
            <p className="font-semibold">{raceDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>

        {race.race_location && (
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-blue-200" />
            <div>
              <p className="text-sm text-blue-100">Location</p>
              <p className="font-semibold">{race.race_location}</p>
            </div>
          </div>
        )}

        {race.goal_finish_time_minutes && (
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-blue-200" />
            <div>
              <p className="text-sm text-blue-100">Goal Time</p>
              <p className="font-semibold">{formatGoalTime(race.goal_finish_time_minutes)}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-end gap-4">
          <div>
            <p className="text-5xl font-bold">{daysUntilRace}</p>
            <p className="text-blue-100 mt-1">days to go</p>
          </div>
          <div className="mb-2">
            <p className="text-2xl font-semibold">{weeksUntilRace}</p>
            <p className="text-sm text-blue-100">weeks</p>
          </div>
        </div>
      </div>
    </div>
  );
}
