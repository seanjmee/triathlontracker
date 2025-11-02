import { useState } from 'react';
import { Waves, Bike, Footprints } from 'lucide-react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block space-y-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              TriTrack
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Your complete triathlon training companion. Track workouts, analyze performance, and achieve your race goals.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Waves className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Swim Tracking</h3>
                <p className="text-gray-600">Monitor pace, distance, and technique improvements</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Bike className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Bike Performance</h3>
                <p className="text-gray-600">Track power, speed, and endurance gains</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Footprints className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Run Analytics</h3>
                <p className="text-gray-600">Improve pace, form, and race-day readiness</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          {isLogin ? (
            <LoginForm onToggleMode={() => setIsLogin(false)} />
          ) : (
            <SignUpForm onToggleMode={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
}
