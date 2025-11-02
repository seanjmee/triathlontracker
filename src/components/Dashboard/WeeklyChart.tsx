import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { formatDateForDB } from '../../lib/dateUtils';
import PieChart from '../Charts/PieChart';

export default function WeeklyChart() {
  const { user } = useAuth();
  const [chartData, setChartData] = useState<{ label: string; value: number; color: string }[]>([]);

  useEffect(() => {
    if (user) {
      loadWeekData();
    }
  }, [user]);

  const loadWeekData = async () => {
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    startOfWeek.setDate(today.getDate() - today.getDay());

    const startDateStr = formatDateForDB(startOfWeek);

    const { data: completed } = await supabase
      .from('completed_workouts')
      .select('discipline')
      .eq('user_id', user!.id)
      .gte('workout_date', startDateStr);

    const counts = {
      swim: 0,
      bike: 0,
      run: 0,
    };

    completed?.forEach(w => {
      const discipline = w.discipline.toLowerCase();
      if (discipline === 'swim' || discipline === 'bike' || discipline === 'run') {
        counts[discipline as keyof typeof counts]++;
      }
    });

    const data = [
      { label: 'Swim', value: counts.swim, color: '#06b6d4' },
      { label: 'Bike', value: counts.bike, color: '#10b981' },
      { label: 'Run', value: counts.run, color: '#f97316' },
    ].filter(item => item.value > 0);

    setChartData(data);
  };

  return (
    <div className="metric-card">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">This Week's Workouts</h3>
      {chartData.length > 0 ? (
        <PieChart data={chartData} size={180} showLegend={true} />
      ) : (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-slate-400">No workouts completed this week</p>
        </div>
      )}
    </div>
  );
}
