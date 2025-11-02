import { useState } from 'react';
import { LogOut, User, Menu, X, Calendar, Activity, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardHeader() {
  const { signOut, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">TriTrack</h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Activity className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Calendar className="w-5 h-5" />
              <span>Calendar</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <User className="w-5 h-5" />
              <span className="text-sm">{user?.email}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <Activity className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <Calendar className="w-5 h-5" />
                <span>Calendar</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </a>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
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
