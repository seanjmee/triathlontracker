# Triathlon Tracker

A comprehensive training log and analytics platform designed specifically for triathletes. Track your swim, bike, and run workouts, visualize your training progress, and stay on top of your race preparation.

## Features

### Race Management
- Set up your primary race with distance type (Sprint, Olympic, Half Ironman, Full Ironman)
- Race countdown timer on dashboard
- Track goal finish times

### Workout Planning & Logging
- **Plan Workouts**: Create detailed training plans with:
  - Discipline selection (Swim, Bike, Run, Brick, Strength, Rest)
  - Workout types (Endurance, Intervals, Tempo, Recovery, Race Pace, Long)
  - Planned duration and distance
  - Workout descriptions and notes

- **Log Completed Workouts**: Record your actual training with:
  - Actual duration and distance
  - Heart rate data
  - RPE (Rate of Perceived Exertion)
  - Feeling indicators (Great, Good, Okay, Tired, Struggled)
  - Performance notes

### Dashboard
- **Quick Stats**: Weekly totals for workouts, distance, and time
- **Week Overview**: Visual calendar showing planned vs completed workouts for the current week
- **Weekly Chart**: Pie chart showing discipline distribution of completed workouts
- **Recent Workouts**: List of your 5 most recent training sessions
- **Race Countdown**: Days remaining until your primary race

### Training Calendar
- **Monthly View**: Full calendar display with workout indicators
- **Day Details**: Click any day to see all planned and completed workouts
- **Quick Actions**: Add planned or completed workouts directly from any calendar day
- **Weekly Summary**: Training volume breakdown by week
- **Monthly Stats**: Overview of total workouts, distance, and time for the month

### Analytics & Insights
- **All-Time Statistics**:
  - Total workouts completed
  - Total distance covered
  - Total training time
  - Average workouts per week

- **Last 30 Days Analytics**:
  - Pie chart showing completed workouts by discipline
  - Bar chart comparing planned vs completed workout counts per discipline
  - Bar chart comparing planned vs completed training hours per discipline

- **Visual Progress Tracking**: Easy-to-read charts showing training adherence and volume

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Email/Password)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Supabase account (free tier available)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/triathlon-tracker.git
cd triathlon-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run database migrations:

The application includes migration files in `supabase/migrations/`. Apply these to your Supabase project to set up the database schema.

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Database Schema

The application uses the following main tables:

- **user_races**: Stores race information and goals
- **planned_workouts**: Training plan entries
- **completed_workouts**: Logged workout data

All tables include Row Level Security (RLS) policies to ensure users can only access their own data.

## Project Structure

```
src/
├── components/
│   ├── Analytics/        # Training statistics and charts
│   ├── Auth/            # Authentication pages
│   ├── Calendar/        # Calendar view and day details
│   ├── Charts/          # Reusable chart components (Pie, Bar)
│   ├── Dashboard/       # Dashboard and widgets
│   ├── Onboarding/      # Race setup wizard
│   ├── Settings/        # Settings and analytics page
│   └── Workouts/        # Workout modals (Add, Edit, Complete)
├── contexts/            # React contexts (Auth)
├── lib/                 # Utilities (Supabase client, date utils)
└── App.tsx             # Main application component
```

## Features in Detail

### Workout Types

The application supports various workout types for each discipline:

- **Endurance**: Long, steady efforts to build aerobic base
- **Intervals**: High-intensity intervals with recovery periods
- **Tempo**: Sustained moderate-to-hard efforts
- **Recovery**: Easy, low-intensity sessions
- **Race Pace**: Practice at target race intensity
- **Long**: Extended duration sessions (typically weekly long run/ride)

### Discipline Categories

- **Swim**: Pool or open water swimming
- **Bike**: Road cycling or indoor trainer
- **Run**: Outdoor running or treadmill
- **Brick**: Combined bike-run sessions
- **Strength**: Gym or bodyweight training
- **Rest**: Recovery days

## Security

- Authentication handled via Supabase Auth
- Row Level Security (RLS) enforced on all database tables
- User data isolated and protected
- Secure API key management through environment variables

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

## Acknowledgments

Built with modern web technologies and designed specifically for triathletes who want a simple, focused training log without the complexity of larger platforms.
