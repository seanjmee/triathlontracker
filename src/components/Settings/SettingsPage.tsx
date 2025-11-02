import DashboardHeader from '../Dashboard/DashboardHeader';
import TrainingStats from '../Analytics/TrainingStats';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600 mt-1">Track your training progress and performance</p>
        </div>

        <TrainingStats />
      </main>
    </div>
  );
}
