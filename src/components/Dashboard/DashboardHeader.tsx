import { useState } from 'react';
import { LogOut, User, Menu, X, Calendar, Activity, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '../../App';

export default function DashboardHeader() {
  const { signOut, user } = useAuth();
  const { currentPage, setCurrentPage } = useNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
              TriTrack
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                currentPage === 'dashboard'
                  ? 'bg-cyan-50 text-cyan-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Activity className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setCurrentPage('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                currentPage === 'calendar'
                  ? 'bg-cyan-50 text-cyan-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => setCurrentPage('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                currentPage === 'settings'
                  ? 'bg-cyan-50 text-cyan-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
              <User className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">{user?.email}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setCurrentPage('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                  currentPage === 'dashboard' ? 'bg-cyan-50 text-cyan-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Activity className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => {
                  setCurrentPage('calendar');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                  currentPage === 'calendar' ? 'bg-cyan-50 text-cyan-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span>Calendar</span>
              </button>
              <button
                onClick={() => {
                  setCurrentPage('settings');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                  currentPage === 'settings' ? 'bg-cyan-50 text-cyan-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
