# Triathlon Tracker

<div align="center">

**A comprehensive training log and analytics platform designed specifically for triathletes**

Track your swim, bike, and run workouts, visualize your training progress, and stay on top of your race preparation.

[Features](#features) • [Screenshots](#screenshots) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Deployment](#deployment) • [Contributing](#contributing)

</div>

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Development Guide](#development-guide)
- [Deployment Guide](#deployment-guide)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Race Management
- **Race Setup**: Configure your primary race with distance type (Sprint, Olympic, Half Ironman, Full Ironman)
- **Race Countdown**: Real-time countdown timer displayed prominently on dashboard
- **Goal Tracking**: Set and monitor goal finish times for your target race
- **Multiple Races**: Support for tracking multiple races with primary race designation

### Workout Planning & Logging

#### Plan Workouts
Create detailed training plans with:
- **Discipline Selection**: Swim, Bike, Run, Brick, Strength, or Rest days
- **Workout Types**:
  - Endurance (long, steady efforts)
  - Intervals (high-intensity with recovery)
  - Tempo (sustained moderate-to-hard efforts)
  - Recovery (easy, low-intensity)
  - Race Pace (target race intensity practice)
  - Long (extended duration sessions)
- **Planned Metrics**: Set target duration and distance
- **Descriptions & Notes**: Add detailed workout descriptions and personal notes

#### Log Completed Workouts
Record your actual training with comprehensive metrics:
- **Performance Data**: Actual duration, distance, and pace
- **Physiological Metrics**: Heart rate tracking
- **Subjective Measures**:
  - RPE (Rate of Perceived Exertion, 1-10 scale)
  - Feeling indicators (Great, Good, Okay, Tired, Struggled)
- **Detailed Notes**: Record performance observations and reflections

### Dashboard

The central hub for your training overview includes:

- **Quick Stats Widget**: Weekly totals for:
  - Number of workouts completed
  - Total distance covered
  - Total training time
  - Training load indicators

- **Week Overview**: Visual calendar showing:
  - Planned workouts for the current week
  - Completed workouts with color-coded discipline indicators
  - Quick comparison of planned vs actual training

- **Weekly Chart**: Interactive pie chart displaying discipline distribution of completed workouts

- **Recent Workouts**: List view of your 5 most recent training sessions with key metrics

- **Race Countdown**: Prominent display of days remaining until your primary race

### Training Calendar

A comprehensive monthly view of your training with:

- **Monthly Calendar View**:
  - Full month display with workout indicators on each day
  - Color-coded dots for different disciplines
  - Visual differentiation between planned and completed workouts

- **Day Detail Modal**:
  - Click any day to see all planned and completed workouts
  - Quick actions to add planned or completed workouts
  - Edit or delete existing workouts

- **Weekly Summary Cards**:
  - Training volume breakdown by week
  - Total workouts, distance, and time per week
  - Week-over-week comparison

- **Monthly Statistics**:
  - Overview of total workouts for the month
  - Total distance covered
  - Total training time
  - Discipline-specific breakdowns

### Analytics & Insights

Comprehensive analytics to track your progress:

#### All-Time Statistics
- **Total Workouts**: Complete count of logged training sessions
- **Total Distance**: Cumulative kilometers/miles across all disciplines
- **Total Training Time**: Hours spent training
- **Average Workouts Per Week**: Training frequency metric

#### Last 30 Days Analytics

**Completed Workouts Distribution**
- Pie chart showing percentage breakdown by discipline
- Visual representation of training balance
- Easy identification of undertraining in specific disciplines

**Planned vs Completed Comparison**
- Side-by-side bar chart comparing planned and completed workout counts
- Discipline-specific adherence tracking
- Training plan compliance visualization

**Training Volume Analysis**
- Bar chart comparing planned vs completed training hours
- Identify training volume gaps
- Track overall training load management

### User Experience Features

- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Intuitive Navigation**: Clear page structure with persistent header navigation
- **Modal-Based Interactions**: Non-intrusive workout creation and editing
- **Real-Time Updates**: Immediate reflection of data changes
- **Data Visualization**: Clean, modern charts for easy insight gathering

---

## Screenshots

### Dashboard
![Dashboard Screenshot](screenshots/dashboard.png)
*Main dashboard showing race countdown, weekly overview, and quick stats*

### Training Calendar
![Calendar Screenshot](screenshots/calendar.png)
*Monthly calendar view with workout indicators and day details*

### Analytics Page
![Analytics Screenshot](screenshots/analytics.png)
*Comprehensive training statistics with multiple chart types*

### Workout Logging
![Workout Modal Screenshot](screenshots/workout-modal.png)
*Detailed workout logging interface with all metrics*

### Race Setup
![Race Setup Screenshot](screenshots/race-setup.png)
*Initial onboarding flow for race configuration*

> **Note**: Replace these placeholder paths with actual screenshots of your application

---

## Tech Stack

### Frontend
- **Framework**: React 18.3.1
- **Language**: TypeScript 5.5.3
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React 0.344.0
- **State Management**: React Context API + Hooks

### Backend & Infrastructure
- **Database**: Supabase (PostgreSQL 15)
- **Authentication**: Supabase Auth (Email/Password)
- **API**: Supabase Auto-generated REST API
- **Real-time**: Supabase Realtime (optional)

### Development Tools
- **Linting**: ESLint 9.9.1 with React plugins
- **Type Checking**: TypeScript compiler
- **CSS Processing**: PostCSS with Autoprefixer

### Libraries & Utilities
- **@supabase/supabase-js**: ^2.57.4 - Supabase client library
- **react**: ^18.3.1 - UI framework
- **react-dom**: ^18.3.1 - React DOM renderer
- **lucide-react**: ^0.344.0 - Icon library

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm**: Version 9.0.0 or higher (comes with Node.js)
  - Verify installation: `npm --version`
  - Alternative: yarn or pnpm

- **Supabase Account**: Free tier available
  - Sign up at [supabase.com](https://supabase.com)
  - Create a new project in your dashboard

- **Git**: For version control
  - Download from [git-scm.com](https://git-scm.com/)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/triathlon-tracker.git
cd triathlon-tracker
```

2. **Install dependencies**

```bash
npm install
```

This will install all required packages listed in `package.json`.

3. **Set up environment variables**

Create a `.env` file in the root directory:

```bash
touch .env
```

Add your Supabase credentials (see [Environment Variables](#environment-variables) section below).

4. **Initialize the database**

Apply the database migrations to your Supabase project (see [Database Setup](#database-setup) section below).

5. **Start the development server**

```bash
npm run dev
```

6. **Open your browser**

Navigate to `http://localhost:5173` to see the application running.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

#### How to Get Your Supabase Credentials

1. **Log in to Supabase Dashboard**
   - Go to [app.supabase.com](https://app.supabase.com)
   - Select your project

2. **Navigate to Project Settings**
   - Click on the gear icon (Settings) in the left sidebar
   - Select "API" from the settings menu

3. **Copy Your Credentials**
   - **Project URL**: Copy the URL under "Project URL" section
   - **Anon Key**: Copy the key under "Project API keys" > "anon" > "public"

4. **Paste into `.env` File**
   - Replace `your-project-id.supabase.co` with your actual Project URL
   - Replace `your-anon-key-here` with your actual Anon Key

#### Environment Variable Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes | None |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key (safe for client-side) | Yes | None |

**Security Notes**:
- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- The anon key is safe to use in client-side code (it's protected by RLS policies)
- Never expose your service role key in client-side code

### Database Setup

The application includes SQL migration files that define the complete database schema.

#### Option 1: Using Supabase Dashboard (Recommended for Beginners)

1. **Log in to Supabase Dashboard**
   - Go to [app.supabase.com](https://app.supabase.com)
   - Select your project

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Copy Migration Files**
   - Open `supabase/migrations/20251102030537_create_initial_schema.sql`
   - Copy the entire contents
   - Paste into the SQL Editor

4. **Run the Migration**
   - Click "Run" button in the bottom right
   - Wait for confirmation message

5. **Apply Additional Migrations** (if any)
   - Repeat for `supabase/migrations/20251102043027_add_unique_constraint_completed_workouts.sql`

#### Option 2: Using Supabase CLI (Advanced)

1. **Install Supabase CLI**

```bash
npm install -g supabase
```

2. **Login to Supabase**

```bash
supabase login
```

3. **Link Your Project**

```bash
supabase link --project-ref your-project-id
```

4. **Push Migrations**

```bash
supabase db push
```

#### Verify Database Setup

After running migrations, verify the tables were created:

1. Go to "Table Editor" in Supabase Dashboard
2. You should see the following tables:
   - `profiles`
   - `user_races`
   - `athlete_metrics`
   - `training_plans`
   - `planned_workouts`
   - `completed_workouts`
   - `race_goals`

---

## Project Structure

```
triathlon-tracker/
├── public/                      # Static assets
├── src/
│   ├── components/              # React components
│   │   ├── Analytics/
│   │   │   └── TrainingStats.tsx        # Analytics dashboard with charts
│   │   ├── Auth/
│   │   │   ├── AuthPage.tsx             # Authentication page wrapper
│   │   │   ├── LoginForm.tsx            # Login form component
│   │   │   └── SignUpForm.tsx           # Registration form component
│   │   ├── Calendar/
│   │   │   ├── CalendarPage.tsx         # Main calendar view
│   │   │   ├── DayDetailModal.tsx       # Day detail popup
│   │   │   ├── MonthlyStats.tsx         # Monthly statistics widget
│   │   │   └── WeeklySummary.tsx        # Weekly breakdown cards
│   │   ├── Charts/
│   │   │   ├── BarChart.tsx             # Reusable bar chart component
│   │   │   └── PieChart.tsx             # Reusable pie chart component
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx            # Main dashboard page
│   │   │   ├── DashboardHeader.tsx      # Navigation header
│   │   │   ├── QuickStats.tsx           # Weekly stats widget
│   │   │   ├── RaceCountdown.tsx        # Race countdown widget
│   │   │   ├── RecentWorkouts.tsx       # Recent workouts list
│   │   │   ├── WeeklyChart.tsx          # Discipline pie chart
│   │   │   └── WeekOverview.tsx         # Week calendar grid
│   │   ├── Onboarding/
│   │   │   └── RaceSetupWizard.tsx      # Initial race setup flow
│   │   ├── Settings/
│   │   │   └── SettingsPage.tsx         # Settings/Analytics page
│   │   └── Workouts/
│   │       ├── AddWorkoutModal.tsx      # Add planned workout
│   │       ├── CompleteWorkoutModal.tsx # Log completed workout
│   │       └── EditWorkoutModal.tsx     # Edit existing workout
│   ├── contexts/
│   │   └── AuthContext.tsx              # Authentication context provider
│   ├── lib/
│   │   ├── database.types.ts            # TypeScript types from Supabase
│   │   ├── dateUtils.ts                 # Date manipulation utilities
│   │   └── supabase.ts                  # Supabase client initialization
│   ├── App.tsx                          # Root application component
│   ├── main.tsx                         # Application entry point
│   ├── index.css                        # Global styles and Tailwind imports
│   └── vite-env.d.ts                    # Vite type definitions
├── supabase/
│   └── migrations/                      # Database migration files
│       ├── 20251102030537_create_initial_schema.sql
│       └── 20251102043027_add_unique_constraint_completed_workouts.sql
├── .env                                 # Environment variables (gitignored)
├── .gitignore                          # Git ignore rules
├── eslint.config.js                    # ESLint configuration
├── index.html                          # HTML entry point
├── package.json                        # Project dependencies and scripts
├── postcss.config.js                   # PostCSS configuration
├── tailwind.config.js                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
├── tsconfig.app.json                   # TypeScript app-specific config
├── tsconfig.node.json                  # TypeScript Node-specific config
├── vite.config.ts                      # Vite build configuration
└── README.md                           # This file
```

### Key Directories

- **`src/components/`**: All React components organized by feature
- **`src/contexts/`**: React Context providers for global state
- **`src/lib/`**: Utility functions and third-party integrations
- **`supabase/migrations/`**: SQL migration files for database schema

---

## API Documentation

The application uses Supabase's auto-generated REST API. All database operations are handled through the Supabase JavaScript client.

### Database Schema

#### Tables

##### `profiles`
User profile information and athlete settings.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key, references auth.users |
| `email` | text | User email address |
| `full_name` | text | User's full name |
| `avatar_url` | text | Profile picture URL (optional) |
| `weight_kg` | decimal | Weight in kilograms (optional) |
| `age` | integer | User age (optional) |
| `gender` | text | Gender identifier (optional) |
| `experience_level` | text | beginner/intermediate/advanced |
| `units_preference` | text | metric/imperial (default: metric) |
| `created_at` | timestamptz | Account creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

##### `user_races`
Race information and goals.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `user_id` | uuid | References profiles(id) |
| `race_name` | text | Name of the race |
| `race_date` | date | Race date |
| `race_location` | text | Race location (optional) |
| `distance_type` | text | sprint/olympic/70.3/ironman/custom |
| `goal_finish_time_minutes` | integer | Target finish time (optional) |
| `registration_status` | text | Registration status (optional) |
| `course_notes` | text | Course information (optional) |
| `is_primary` | boolean | Primary race flag (default: false) |
| `created_at` | timestamptz | Creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

##### `athlete_metrics`
Baseline fitness metrics for training zones.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `user_id` | uuid | References profiles(id), unique |
| `ftp_watts` | integer | Functional Threshold Power (optional) |
| `swim_css_pace_per_100m` | integer | Critical Swim Speed in seconds (optional) |
| `run_threshold_pace_per_km` | integer | Threshold pace in seconds (optional) |
| `max_heart_rate` | integer | Maximum heart rate (optional) |
| `resting_heart_rate` | integer | Resting heart rate (optional) |
| `updated_at` | timestamptz | Last update timestamp |

##### `training_plans`
Structured training plan configurations.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `user_id` | uuid | References profiles(id) |
| `race_id` | uuid | References user_races(id) (optional) |
| `plan_name` | text | Name of the training plan |
| `start_date` | date | Plan start date |
| `end_date` | date | Plan end date |
| `weeks_duration` | integer | Duration in weeks |
| `weekly_hours_available` | decimal | Available training hours per week (optional) |
| `plan_type` | text | beginner/intermediate/advanced/custom |
| `created_at` | timestamptz | Creation timestamp |

##### `planned_workouts`
Scheduled workout sessions.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `user_id` | uuid | References profiles(id) |
| `plan_id` | uuid | References training_plans(id) (optional) |
| `workout_date` | date | Scheduled date |
| `discipline` | text | swim/bike/run/brick/strength/rest |
| `workout_type` | text | endurance/tempo/intervals/recovery/race_pace/long |
| `planned_duration_minutes` | integer | Planned duration (optional) |
| `planned_distance_meters` | integer | Planned distance (optional) |
| `intensity_zone` | text | z1/z2/z3/z4/z5 (optional) |
| `description` | text | Workout description (optional) |
| `notes` | text | Additional notes (optional) |
| `created_at` | timestamptz | Creation timestamp |

##### `completed_workouts`
Logged workout data with metrics.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `user_id` | uuid | References profiles(id) |
| `planned_workout_id` | uuid | References planned_workouts(id) (optional) |
| `workout_date` | date | Workout date |
| `discipline` | text | swim/bike/run/brick/strength/rest |
| `actual_duration_minutes` | integer | Actual duration |
| `actual_distance_meters` | integer | Actual distance (optional) |
| `average_pace_per_km` | integer | Average pace in seconds (optional) |
| `average_heart_rate` | integer | Average HR (optional) |
| `average_power_watts` | integer | Average power (optional) |
| `elevation_gain_meters` | integer | Elevation gain (optional) |
| `rpe` | integer | Rate of Perceived Exertion 1-10 (optional) |
| `workout_notes` | text | Workout notes (optional) |
| `weather_conditions` | text | Weather description (optional) |
| `equipment_used` | text | Equipment notes (optional) |
| `feeling` | text | great/good/okay/tired/struggled (optional) |
| `created_at` | timestamptz | Creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

##### `race_goals`
Target splits and race day strategy.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `race_id` | uuid | References user_races(id), unique |
| `swim_goal_minutes` | integer | Target swim time (optional) |
| `t1_goal_minutes` | integer | Target T1 time (optional) |
| `bike_goal_minutes` | integer | Target bike time (optional) |
| `t2_goal_minutes` | integer | Target T2 time (optional) |
| `run_goal_minutes` | integer | Target run time (optional) |
| `nutrition_strategy` | text | Nutrition plan (optional) |
| `pacing_strategy` | text | Pacing strategy (optional) |
| `updated_at` | timestamptz | Last update timestamp |

### Common API Operations

#### Fetch User's Races

```typescript
const { data, error } = await supabase
  .from('user_races')
  .select('*')
  .eq('user_id', user.id)
  .order('race_date', { ascending: true });
```

#### Create a Planned Workout

```typescript
const { data, error } = await supabase
  .from('planned_workouts')
  .insert({
    user_id: user.id,
    workout_date: '2024-11-15',
    discipline: 'run',
    workout_type: 'intervals',
    planned_duration_minutes: 60,
    planned_distance_meters: 10000,
    description: '6x800m at 5k pace'
  })
  .select()
  .single();
```

#### Log a Completed Workout

```typescript
const { data, error } = await supabase
  .from('completed_workouts')
  .insert({
    user_id: user.id,
    workout_date: '2024-11-15',
    discipline: 'bike',
    actual_duration_minutes: 90,
    actual_distance_meters: 40000,
    average_heart_rate: 145,
    rpe: 6,
    feeling: 'good',
    workout_notes: 'Felt strong on the hills'
  })
  .select()
  .single();
```

#### Get Workouts for a Date Range

```typescript
const { data, error } = await supabase
  .from('completed_workouts')
  .select('*')
  .eq('user_id', user.id)
  .gte('workout_date', startDate)
  .lte('workout_date', endDate)
  .order('workout_date', { ascending: true });
```

### Row Level Security (RLS)

All tables have Row Level Security enabled. Users can only access their own data through policies that check `auth.uid() = user_id`.

**Policy Examples**:
- Users can SELECT, INSERT, UPDATE, and DELETE only their own records
- Race goals are accessible through the user_races relationship
- All operations require authentication

---

## Development Guide

### Development Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint

# Run TypeScript type checking
npm run typecheck
```

### Code Style Guidelines

#### TypeScript
- Use TypeScript for all new files
- Prefer interfaces over types for object shapes
- Use proper typing; avoid `any` types
- Export types that are used across multiple files

#### React
- Use functional components with hooks
- Prefer named exports over default exports for components
- Keep components focused and small (single responsibility)
- Use custom hooks for shared logic

#### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing using Tailwind's spacing scale
- Use semantic color names from Tailwind config

#### File Organization
- One component per file
- Co-locate related components in feature folders
- Keep utility functions in `src/lib/`
- Use barrel exports (index.ts) for cleaner imports

### Adding New Features

1. **Create a new branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Plan your database changes**
- If you need new tables or columns, create a migration file
- Follow the naming convention: `YYYYMMDDHHMMSS_description.sql`
- Include detailed comments in the migration

3. **Build the UI components**
- Start with the component structure
- Add TypeScript interfaces for props
- Implement the functionality
- Style with Tailwind CSS

4. **Integrate with Supabase**
- Add database queries in the component or custom hook
- Handle loading and error states
- Ensure proper TypeScript typing for data

5. **Test your changes**
- Test on different screen sizes
- Verify data persistence
- Check error handling
- Test authentication flows

6. **Commit and push**
```bash
git add .
git commit -m "Add feature: description"
git push origin feature/your-feature-name
```

### Working with Supabase

#### Generating TypeScript Types

After making database changes, regenerate types:

```bash
npx supabase gen types typescript --project-id your-project-id > src/lib/database.types.ts
```

#### Testing Database Queries

Use the Supabase Dashboard SQL Editor to test queries before implementing them in code.

#### Real-Time Subscriptions (Optional)

For real-time features, use Supabase subscriptions:

```typescript
const subscription = supabase
  .channel('workouts')
  .on('postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'completed_workouts',
      filter: `user_id=eq.${user.id}`
    },
    (payload) => {
      console.log('New workout:', payload.new);
    }
  )
  .subscribe();

// Cleanup
return () => {
  subscription.unsubscribe();
};
```

### Debugging Tips

- **React DevTools**: Install browser extension for component inspection
- **Console Logging**: Use `console.log` for quick debugging
- **Network Tab**: Check Supabase API calls in browser DevTools
- **Supabase Logs**: View database logs in Supabase Dashboard > Logs
- **TypeScript Errors**: Run `npm run typecheck` to catch type issues

---

## Deployment Guide

### Deploying to Vercel (Recommended)

Vercel offers free hosting with excellent performance for Vite applications.

#### Quick Deploy

1. **Push to GitHub**
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Vercel auto-detects Vite configuration

3. **Configure Environment Variables**
- In Vercel project settings, go to "Environment Variables"
- Add:
  - `VITE_SUPABASE_URL`: Your Supabase project URL
  - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

4. **Deploy**
- Click "Deploy"
- Wait for build to complete
- Your app will be live at `your-project.vercel.app`

#### Custom Domain (Optional)

1. Go to Vercel project settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Deploying to Netlify

1. **Build the Project**
```bash
npm run build
```

2. **Deploy to Netlify**

**Option A: Drag & Drop**
- Go to [netlify.com](https://netlify.com)
- Drag the `dist` folder to deploy

**Option B: CLI**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

3. **Configure Environment Variables**
- Go to Site settings > Build & deploy > Environment
- Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

4. **Set Redirects**

Create `dist/_redirects`:
```
/*  /index.html  200
```

### Deploying to Other Platforms

#### GitHub Pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update vite.config.ts**
```typescript
export default defineConfig({
  base: '/triathlon-tracker/',
  // ... rest of config
});
```

3. **Add Deploy Script to package.json**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. **Deploy**
```bash
npm run deploy
```

#### Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Build and run:
```bash
docker build -t triathlon-tracker .
docker run -p 80:80 triathlon-tracker
```

### Post-Deployment Checklist

- [ ] Verify environment variables are set correctly
- [ ] Test authentication flow (signup, login, logout)
- [ ] Test creating and viewing workouts
- [ ] Check responsive design on mobile devices
- [ ] Verify all API calls work in production
- [ ] Test all navigation flows
- [ ] Check browser console for errors
- [ ] Verify database operations work correctly
- [ ] Test RLS policies are enforced
- [ ] Set up monitoring and error tracking (optional)

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: "Failed to fetch" or CORS errors

**Cause**: Incorrect Supabase URL or network connectivity issues.

**Solution**:
1. Verify your `.env` file has the correct `VITE_SUPABASE_URL`
2. Check if the URL includes `https://`
3. Ensure your Supabase project is active
4. Check browser console for detailed error messages

#### Issue: Authentication not working

**Cause**: Email confirmation might be enabled or incorrect Supabase key.

**Solution**:
1. In Supabase Dashboard, go to Authentication > Settings
2. Disable "Enable email confirmations" if not needed
3. Verify `VITE_SUPABASE_ANON_KEY` is correct in `.env`
4. Clear browser cookies and local storage
5. Try signing up with a new email

#### Issue: Can't see data after creating workouts

**Cause**: Row Level Security policies blocking access.

**Solution**:
1. Verify RLS policies are correctly applied
2. Check that `auth.uid()` matches the `user_id` in your data
3. Use Supabase Dashboard > SQL Editor to manually check data
4. Ensure you're logged in with the correct account

#### Issue: TypeScript errors after database changes

**Cause**: Database types are out of sync with schema.

**Solution**:
1. Regenerate types from Supabase:
```bash
npx supabase gen types typescript --project-id your-project-id > src/lib/database.types.ts
```
2. Restart your development server
3. Run `npm run typecheck` to verify

#### Issue: Build fails in production

**Cause**: Environment variables not set or TypeScript errors.

**Solution**:
1. Verify all environment variables are set in your deployment platform
2. Run `npm run build` locally to test
3. Run `npm run typecheck` to catch type errors
4. Check build logs for specific error messages

#### Issue: Workouts showing on wrong dates

**Cause**: Timezone inconsistencies.

**Solution**:
1. Always use local dates without time components for workout dates
2. Use the `dateUtils.ts` helper functions for date manipulation
3. Store dates as `YYYY-MM-DD` format in the database
4. Avoid using `new Date()` with time components for workout dates

#### Issue: Charts not displaying data

**Cause**: No data in selected time range or data fetching error.

**Solution**:
1. Check browser console for errors
2. Verify workouts exist in the time range
3. Check that data queries are returning results
4. Ensure user is properly authenticated
5. Verify chart component props are correctly typed

#### Issue: Slow performance or page freezing

**Cause**: Too many database queries or large dataset rendering.

**Solution**:
1. Use `useMemo` and `useCallback` for expensive computations
2. Implement pagination for large lists
3. Add indexes to frequently queried database columns
4. Consider using Supabase's built-in caching
5. Profile performance with React DevTools

#### Issue: Cannot delete workouts

**Cause**: Foreign key constraints or RLS policy issues.

**Solution**:
1. Check if workout has related records (e.g., completed_workout linked to planned_workout)
2. Verify DELETE policy exists in RLS for the table
3. Check browser console for specific error message
4. Use `ON DELETE CASCADE` in foreign keys if appropriate

### Getting Help

If you encounter issues not covered here:

1. **Check Browser Console**: Look for error messages and stack traces
2. **Check Supabase Logs**: Go to Dashboard > Logs to see database errors
3. **Review Documentation**: Check Supabase and React documentation
4. **Search Issues**: Look through GitHub issues for similar problems
5. **Ask for Help**: Open a new issue with:
   - Description of the problem
   - Steps to reproduce
   - Error messages or screenshots
   - Your environment (browser, Node version, etc.)

---

## FAQ

### General Questions

**Q: Is this application free to use?**
A: Yes, the application is open source. The only cost would be for Supabase hosting if you exceed the free tier limits (which is generous for personal use).

**Q: Can I use this for commercial purposes?**
A: Yes, this project is licensed under the MIT License, which allows commercial use.

**Q: Does it work offline?**
A: Currently, no. The application requires an internet connection to sync with Supabase. Offline support could be added as a future feature.

### Features

**Q: Can I track multiple races?**
A: Yes, you can track multiple races, but only one can be designated as your "primary" race which appears on the dashboard countdown.

**Q: Can I import data from other platforms (Strava, Garmin, etc.)?**
A: Not currently. This would be a great feature for future development. You can manually log your workouts.

**Q: Can I export my training data?**
A: Currently, no built-in export feature exists. However, you can access your data directly from the Supabase dashboard and export it as CSV.

**Q: Does it support swim, bike, and run separately?**
A: Yes! The app fully supports all three disciplines plus brick workouts (combined bike-run), strength training, and rest days.

**Q: Can I share my training with a coach?**
A: Not yet. This would require implementing sharing features and additional RLS policies. It's on the roadmap.

### Technical Questions

**Q: Why Supabase instead of Firebase?**
A: Supabase offers:
- PostgreSQL (more powerful than Firestore)
- Better pricing for the free tier
- Auto-generated REST API
- Built-in authentication
- SQL-based queries (easier to reason about)

**Q: Can I self-host this?**
A: Yes! You can:
- Host the frontend on any static hosting service
- Self-host Supabase using Docker
- The entire stack is open source

**Q: Does it support PWA (Progressive Web App)?**
A: Not currently, but this would be a valuable addition for mobile users. It could be added with Vite's PWA plugin.

**Q: How is data security handled?**
A: Security is managed through:
- Supabase's Row Level Security (RLS) policies
- Authentication via Supabase Auth
- All data operations require authentication
- Users can only access their own data

**Q: Can I use a different database?**
A: Technically yes, but you'd need to:
- Rewrite all database queries
- Implement authentication separately
- Set up your own backend API
- Significantly more development work

### Data and Privacy

**Q: Who can see my workout data?**
A: Only you. RLS policies ensure complete data isolation between users.

**Q: Where is my data stored?**
A: Your data is stored in Supabase's PostgreSQL database. You can choose the database region when creating your Supabase project.

**Q: Can I delete my account and data?**
A: Yes. When you delete your auth account in Supabase, all your data is cascade-deleted from all tables.

**Q: Is my heart rate and performance data encrypted?**
A: Data is encrypted in transit (HTTPS) and at rest in Supabase's database. Supabase follows industry-standard security practices.

---

## Roadmap

### Version 1.1 (Q4 2024)
- [ ] Data export functionality (CSV, JSON)
- [ ] Training plan templates (beginner, intermediate, advanced)
- [ ] Weekly training summary email notifications
- [ ] Dark mode support
- [ ] Performance optimization for large datasets

### Version 1.2 (Q1 2025)
- [ ] Mobile app (React Native)
- [ ] Offline support with sync
- [ ] Advanced filtering and search
- [ ] Custom training zones configuration
- [ ] Workout library with descriptions

### Version 2.0 (Q2 2025)
- [ ] Coach sharing and collaboration features
- [ ] Training plan marketplace
- [ ] Strava integration for automatic workout import
- [ ] Garmin Connect integration
- [ ] Advanced analytics and insights
- [ ] AI-powered training recommendations
- [ ] Multi-race season planning
- [ ] Nutrition tracking
- [ ] Injury logging and recovery tracking

### Future Considerations
- [ ] Social features (follow athletes, share workouts)
- [ ] Race results tracking
- [ ] Equipment tracking and maintenance reminders
- [ ] Video analysis integration
- [ ] Virtual training partners and challenges
- [ ] Integration with smart trainers
- [ ] Podcast integration for long workouts
- [ ] Weather integration and recommendations

### Community Requests
Have a feature request? Open an issue with the label `feature-request` and describe:
- The feature you'd like to see
- Your use case
- Any implementation ideas

---

## Contributing

Contributions are welcome and appreciated! Whether you're fixing bugs, adding features, or improving documentation, your help makes this project better.

### Ways to Contribute

- **Report Bugs**: Open an issue describing the bug and how to reproduce it
- **Suggest Features**: Open an issue with your feature idea and use case
- **Improve Documentation**: Fix typos, clarify instructions, add examples
- **Submit Code**: Fix bugs or implement new features via pull requests
- **Share Feedback**: Let us know what's working well or could be improved

### Development Process

1. **Fork the Repository**
```bash
# Click "Fork" on GitHub, then clone your fork
git clone https://github.com/your-username/triathlon-tracker.git
cd triathlon-tracker
```

2. **Create a Branch**
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

3. **Make Your Changes**
- Follow the code style guidelines
- Write clear, descriptive commit messages
- Add comments for complex logic
- Update documentation if needed

4. **Test Your Changes**
```bash
npm run typecheck  # Check for TypeScript errors
npm run lint       # Check for linting issues
npm run build      # Ensure production build works
```

5. **Commit Your Changes**
```bash
git add .
git commit -m "feat: add workout filtering by discipline"
# or
git commit -m "fix: resolve date timezone issue in calendar"
```

**Commit Message Conventions**:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

6. **Push to Your Fork**
```bash
git push origin feature/your-feature-name
```

7. **Open a Pull Request**
- Go to the original repository on GitHub
- Click "New Pull Request"
- Select your fork and branch
- Describe your changes clearly
- Reference any related issues

### Pull Request Guidelines

**Good Pull Requests**:
- Focus on a single feature or fix
- Include a clear description of changes
- Reference related issues (e.g., "Fixes #42")
- Pass all TypeScript and lint checks
- Include screenshots for UI changes
- Update documentation if needed

**What to Avoid**:
- Large, unfocused changes
- Unrelated changes in one PR
- Breaking changes without discussion
- Poor or missing commit messages
- Ignoring code style guidelines

### Code Review Process

1. A maintainer will review your PR
2. They may request changes or ask questions
3. Make requested changes and push updates
4. Once approved, your PR will be merged
5. Your contribution will be credited in release notes

### Development Setup for Contributors

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# In another terminal, run type checking in watch mode
npm run typecheck -- --watch

# Run linting
npm run lint
```

### Areas Where Help Is Needed

- **Testing**: Writing unit and integration tests
- **Accessibility**: Improving keyboard navigation and screen reader support
- **Mobile Optimization**: Enhancing mobile UI/UX
- **Performance**: Optimizing render performance and data fetching
- **Documentation**: Improving guides and adding examples
- **Internationalization**: Adding support for multiple languages

### Community Guidelines

- **Be Respectful**: Treat everyone with respect and kindness
- **Be Patient**: Remember that maintainers are volunteers
- **Be Constructive**: Provide helpful, actionable feedback
- **Be Collaborative**: Work together to find the best solutions

### Recognition

Contributors will be:
- Credited in release notes
- Listed in the Contributors section (coming soon)
- Thanked in the project's acknowledgments

---

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 Triathlon Tracker Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### What This Means

You are free to:
- ✅ Use this software for personal projects
- ✅ Use this software for commercial projects
- ✅ Modify the code to suit your needs
- ✅ Distribute copies of the software
- ✅ Sublicense the software

With the following conditions:
- 📄 Include the original license and copyright notice
- 🚫 No warranty is provided

---

## Support

### Getting Help

**Documentation**: Start with this README and the inline code comments

**GitHub Issues**: For bug reports and feature requests
- Search existing issues first
- Use issue templates when provided
- Include reproduction steps for bugs

**Discussions**: For questions and general discussion
- Go to the "Discussions" tab on GitHub
- Search before asking to avoid duplicates
- Help others when you can

### Reporting Bugs

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to recreate the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Environment**:
   - Browser and version
   - Operating system
   - Node.js version
   - Relevant package versions

### Security Issues

If you discover a security vulnerability, please email [your-email@example.com] instead of opening a public issue. Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

---

## Acknowledgments

### Built With

- [React](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Supabase](https://supabase.com/) - Backend as a service
- [Lucide](https://lucide.dev/) - Icon library

### Inspiration

This project was built to address the needs of triathletes who want a simple, focused training log without the complexity and cost of larger platforms. Inspired by the triathlon community's dedication to tracking and improving performance.

### Contributors

Thank you to everyone who has contributed to this project! (Contributors list coming soon)

### Special Thanks

- The Supabase team for an excellent backend platform
- The React and TypeScript communities for great tools and resources
- The triathlon community for feedback and inspiration
- All the beta testers who provided valuable insights

---

## Contact

- **Project Repository**: https://github.com/yourusername/triathlon-tracker
- **Report Issues**: https://github.com/yourusername/triathlon-tracker/issues
- **Discussions**: https://github.com/yourusername/triathlon-tracker/discussions
- **Email**: your-email@example.com

---

<div align="center">

**Built with ❤️ by triathletes, for triathletes**

Star ⭐ this repository if you find it helpful!

[Report Bug](https://github.com/yourusername/triathlon-tracker/issues) • [Request Feature](https://github.com/yourusername/triathlon-tracker/issues) • [Contribute](CONTRIBUTING.md)

</div>
