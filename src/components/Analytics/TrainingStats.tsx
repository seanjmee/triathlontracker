import { useEffect, useState } from 'react';
import { Activity, TrendingUp, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import PieChart from '../Charts/PieChart';
import BarChart from '../Charts/BarChart';
import { formatDateForDB } from '../../lib/dateUtils';

interface DisciplineStats {
  swim: { planned: number; completed: number; plannedDuration: number; completedDuration: number };
  bike: { planned: number; completed: number; plannedDuration: number; completedDuration: number };
  run: { planned: number; completed: number; plannedDuration: number; completedDuration: number };
}

export default function TrainingStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalDistance: 0,
    totalDuration: 0,
    avgPerWeek: 0,
  });
  const [disciplineStats, setDisciplineStats] = useState<DisciplineStats>({
    swim: { planned: 0, completed: 0, plannedDuration: 0, completedDuration: 0 },
    bike: { planned: 0, completed: 0, plannedDuration: 0, completedDuration: 0 },
    run: { planned: 0, completed: 0, plannedDuration: 0, completedDuration: 0 },
  });

  useEffect(() => {
    if (user) {
      loadStats();
      loadDisciplineStats();
    }
  }, [user]);

  const loadStats = async () => {
    const { data: workouts } = await supabase
      .from('completed_workouts')
      .select('actual_duration_minutes, actual_distance_meters, workout_date')
      .eq('user_id', user!.id);

    if (!workouts) return;

    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce((sum, w) => sum + w.actual_duration_minutes, 0);
    const totalDistance = workouts.reduce((sum, w) => sum + (w.actual_distance_meters || 0), 0);

    const dates = workouts.map(w => new Date(w.workout_date));
    const weeks = dates.length > 0
      ? Math.ceil((Math.max(...dates.map(d => d.getTime())) - Math.min(...dates.map(d => d.getTime()))) / (1000 * 60 * 60 * 24 * 7)) || 1
      : 1;
    const avgPerWeek = totalWorkouts / weeks;

    setStats({
      totalWorkouts,
      totalDistance: Math.round(totalDistance / 1000),
      totalDuration,
      avgPerWeek: Math.round(avgPerWeek * 10) / 10,
    });
  };

  const loadDisciplineStats = async () => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const startDate = formatDateForDB(thirtyDaysAgo);

    const { data: completed } = await supabase
      .from('completed_workouts')
      .select('discipline, actual_duration_minutes')
      .eq('user_id', user!.id)
      .gte('workout_date', startDate);

    const { data: planned } = await supabase
      .from('planned_workouts')
      .select('discipline, planned_duration_minutes')
      .eq('user_id', user!.id)
      .gte('workout_date', startDate);

    const newStats: DisciplineStats = {
      swim: { planned: 0, completed: 0, plannedDuration: 0, completedDuration: 0 },
      bike: { planned: 0, completed: 0, plannedDuration: 0, completedDuration: 0 },
      run: { planned: 0, completed: 0, plannedDuration: 0, completedDuration: 0 },
    };

    completed?.forEach(w => {
      const discipline = w.discipline.toLowerCase() as keyof DisciplineStats;
      if (newStats[discipline]) {
        newStats[discipline].completed++;
        newStats[discipline].completedDuration += w.actual_duration_minutes;
      }
    });

    planned?.forEach(w => {
      const discipline = w.discipline.toLowerCase() as keyof DisciplineStats;
      if (newStats[discipline] && w.planned_duration_minutes) {
        newStats[discipline].planned++;
        newStats[discipline].plannedDuration += w.planned_duration_minutes;
      }
    });

    setDisciplineStats(newStats);
  };

  const pieChartData = [
    {
      label: 'Swim',
      value: disciplineStats.swim.completed,
      color: '#06b6d4',
    },
    {
      label: 'Bike',
      value: disciplineStats.bike.completed,
      color: '#10b981',
    },
    {
      label: 'Run',
      value: disciplineStats.run.completed,
      color: '#f97316',
    },
  ].filter(item => item.value > 0);

  const barChartData = [
    {
      label: 'Swim',
      planned: Math.round(disciplineStats.swim.plannedDuration / 60),
      completed: Math.round(disciplineStats.swim.completedDuration / 60),
      color: '#06b6d4',
    },
    {
      label: 'Bike',
      planned: Math.round(disciplineStats.bike.plannedDuration / 60),
      completed: Math.round(disciplineStats.bike.completedDuration / 60),
      color: '#10b981',
    },
    {
      label: 'Run',
      planned: Math.round(disciplineStats.run.plannedDuration / 60),
      completed: Math.round(disciplineStats.run.completedDuration / 60),
      color: '#f97316',
    },
  ];

  const barChartWorkoutsData = [
    {
      label: 'Swim',
      planned: disciplineStats.swim.planned,
      completed: disciplineStats.swim.completed,
      color: '#06b6d4',
    },
    {
      label: 'Bike',
      planned: disciplineStats.bike.planned,
      completed: disciplineStats.bike.completed,
      color: '#10b981',
    },
    {
      label: 'Run',
      planned: disciplineStats.run.planned,
      completed: disciplineStats.run.completed,
      color: '#f97316',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="metric-card">
        <h3 className="text-xl font-bold text-slate-900 mb-6">All-Time Statistics</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-cyan-100 rounded-lg mb-2">
              <Activity className="w-6 h-6 text-cyan-600" />
            </div>
            <p className="text-sm text-slate-600 mb-1">Total Workouts</p>
            <p className="text-2xl font-bold text-slate-900">{stats.totalWorkouts}</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-emerald-100 rounded-lg mb-2">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-sm text-slate-600 mb-1">Total Distance</p>
            <p className="text-2xl font-bold text-slate-900">{stats.totalDistance} km</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-orange-100 rounded-lg mb-2">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-sm text-slate-600 mb-1">Total Time</p>
            <p className="text-2xl font-bold text-slate-900">{Math.round(stats.totalDuration / 60)}h</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-violet-100 rounded-lg mb-2">
              <TrendingUp className="w-6 h-6 text-violet-600" />
            </div>
            <p className="text-sm text-slate-600 mb-1">Avg per Week</p>
            <p className="text-2xl font-bold text-slate-900">{stats.avgPerWeek}</p>
          </div>
        </div>
      </div>

      <div className="metric-card">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Last 30 Days</h3>
        <p className="text-sm text-slate-500 mb-6">Planned vs Completed Workouts</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-center text-sm font-semibold text-slate-700 mb-4">Completed Workouts by Discipline</h4>
            <PieChart data={pieChartData} size={220} />
          </div>

          <div>
            <h4 className="text-center text-sm font-semibold text-slate-700 mb-4">Workout Count: Planned vs Completed</h4>
            <BarChart data={barChartWorkoutsData} height={220} unit="" />
          </div>
        </div>
      </div>

      <div className="metric-card">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Training Volume</h3>
        <p className="text-sm text-slate-500 mb-6">Duration in hours (last 30 days)</p>
        <BarChart data={barChartData} height={250} unit="h" />
      </div>
    </div>
  );
}
