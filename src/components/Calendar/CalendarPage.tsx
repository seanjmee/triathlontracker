import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import DashboardHeader from '../Dashboard/DashboardHeader';
import DayDetailModal from './DayDetailModal';
import WeeklySummary from './WeeklySummary';
import MonthlyStats from './MonthlyStats';

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

export default function CalendarPage() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadMonthWorkouts();
    }
  }, [user, currentDate]);

  const loadMonthWorkouts = async () => {
    setLoading(true);
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const { data: planned } = await supabase
      .from('planned_workouts')
      .select('*')
      .eq('user_id', user!.id)
      .gte('workout_date', startOfMonth.toISOString().split('T')[0])
      .lte('workout_date', endOfMonth.toISOString().split('T')[0]);

    const { data: completed } = await supabase
      .from('completed_workouts')
      .select('*')
      .eq('user_id', user!.id)
      .gte('workout_date', startOfMonth.toISOString().split('T')[0])
      .lte('workout_date', endOfMonth.toISOString().split('T')[0]);

    const completedMap = new Map(completed?.map(c => [c.planned_workout_id, c]) || []);
    const allWorkouts: Workout[] = [];

    planned?.forEach(p => {
      const comp = completedMap.get(p.id);
      allWorkouts.push({
        id: p.id,
        workout_date: p.workout_date,
        discipline: p.discipline,
        planned_duration_minutes: p.planned_duration_minutes,
        planned_distance_meters: p.planned_distance_meters,
        actual_duration_minutes: comp?.actual_duration_minutes,
        actual_distance_meters: comp?.actual_distance_meters,
        completed: !!comp,
      });
      if (comp) {
        completedMap.delete(p.id);
      }
    });

    completedMap.forEach(c => {
      allWorkouts.push({
        id: c.id,
        workout_date: c.workout_date,
        discipline: c.discipline,
        actual_duration_minutes: c.actual_duration_minutes,
        actual_distance_meters: c.actual_distance_meters,
        completed: true,
      });
    });

    setWorkouts(allWorkouts);
    setLoading(false);
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getWorkoutsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return workouts.filter(w => w.workout_date === dateStr);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getDisciplineColor = (discipline: string) => {
    const colors: { [key: string]: string } = {
      swim: 'bg-blue-500',
      bike: 'bg-green-500',
      run: 'bg-orange-500',
      brick: 'bg-purple-500',
      strength: 'bg-gray-500',
      rest: 'bg-teal-500',
    };
    return colors[discipline.toLowerCase()] || 'bg-gray-500';
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const days = getDaysInMonth();
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Training Calendar</h1>
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Today
            </button>
          </div>

          <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>

            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <MonthlyStats workouts={workouts} currentDate={currentDate} />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-3 text-center text-sm font-semibold text-gray-700">
                {day}
              </div>
            ))}
          </div>

          {weeks.map((week, weekIndex) => (
            <div key={weekIndex}>
              <div className="grid grid-cols-7">
                {week.map((date, dayIndex) => {
                  const dayWorkouts = getWorkoutsForDate(date);
                  const isCurrentDay = isToday(date);

                  return (
                    <button
                      key={dayIndex}
                      onClick={() => date && setSelectedDate(date.toISOString().split('T')[0])}
                      disabled={!date}
                      className={`min-h-24 p-2 border-b border-r border-gray-200 hover:bg-gray-50 transition-colors text-left ${
                        !date ? 'bg-gray-50 cursor-default' : ''
                      } ${isCurrentDay ? 'bg-blue-50' : ''}`}
                    >
                      {date && (
                        <>
                          <div
                            className={`text-sm font-semibold mb-1 ${
                              isCurrentDay ? 'text-blue-600' : 'text-gray-900'
                            }`}
                          >
                            {date.getDate()}
                          </div>
                          <div className="space-y-1">
                            {dayWorkouts.slice(0, 3).map((workout) => (
                              <div
                                key={workout.id}
                                className={`text-xs px-1 py-0.5 rounded text-white ${getDisciplineColor(
                                  workout.discipline
                                )} ${workout.completed ? '' : 'opacity-50'}`}
                              >
                                {workout.discipline.slice(0, 4)}
                              </div>
                            ))}
                            {dayWorkouts.length > 3 && (
                              <div className="text-xs text-gray-500 px-1">
                                +{dayWorkouts.length - 3} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
              <WeeklySummary week={week} workouts={workouts} />
            </div>
          ))}
        </div>
      </main>

      {selectedDate && (
        <DayDetailModal
          date={selectedDate}
          workouts={workouts.filter(w => w.workout_date === selectedDate)}
          onClose={() => setSelectedDate(null)}
          onRefresh={loadMonthWorkouts}
        />
      )}
    </div>
  );
}
