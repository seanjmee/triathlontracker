/*
  # Initial Triathlon Training App Schema

  ## Overview
  This migration creates the complete database schema for a multi-user triathlon training platform.
  Users can create races, track training plans, log workouts, and analyze performance.

  ## New Tables Created

  ### 1. `profiles`
  User profile information and athlete metrics
  - `id` (uuid, references auth.users)
  - `email` (text)
  - `full_name` (text)
  - `avatar_url` (text, optional)
  - `weight_kg` (decimal, optional)
  - `age` (integer, optional)
  - `gender` (text, optional)
  - `experience_level` (text: beginner/intermediate/advanced)
  - `units_preference` (text: metric/imperial, default: metric)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `user_races`
  Race details and goals for each user
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `race_name` (text)
  - `race_date` (date)
  - `race_location` (text, optional)
  - `distance_type` (text: sprint/olympic/70.3/ironman/custom)
  - `goal_finish_time_minutes` (integer, optional)
  - `registration_status` (text, optional)
  - `course_notes` (text, optional)
  - `is_primary` (boolean, default: false)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `athlete_metrics`
  Baseline fitness metrics for training zones
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `ftp_watts` (integer, optional - Functional Threshold Power for cycling)
  - `swim_css_pace_per_100m` (integer, optional - Critical Swim Speed in seconds)
  - `run_threshold_pace_per_km` (integer, optional - in seconds)
  - `max_heart_rate` (integer, optional)
  - `resting_heart_rate` (integer, optional)
  - `updated_at` (timestamptz)

  ### 4. `training_plans`
  User's training plan configuration
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `race_id` (uuid, references user_races)
  - `plan_name` (text)
  - `start_date` (date)
  - `end_date` (date)
  - `weeks_duration` (integer)
  - `weekly_hours_available` (decimal, optional)
  - `plan_type` (text: beginner/intermediate/advanced/custom)
  - `created_at` (timestamptz)

  ### 5. `planned_workouts`
  Scheduled workout sessions
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `plan_id` (uuid, references training_plans, optional)
  - `workout_date` (date)
  - `discipline` (text: swim/bike/run/brick/strength/rest)
  - `workout_type` (text: endurance/tempo/intervals/recovery/race_pace)
  - `planned_duration_minutes` (integer, optional)
  - `planned_distance_meters` (integer, optional)
  - `intensity_zone` (text, optional: z1/z2/z3/z4/z5)
  - `description` (text, optional)
  - `notes` (text, optional)
  - `created_at` (timestamptz)

  ### 6. `completed_workouts`
  Logged workout data
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `planned_workout_id` (uuid, references planned_workouts, optional)
  - `workout_date` (date)
  - `discipline` (text: swim/bike/run/brick/strength/rest)
  - `actual_duration_minutes` (integer)
  - `actual_distance_meters` (integer, optional)
  - `average_pace_per_km` (integer, optional - in seconds)
  - `average_heart_rate` (integer, optional)
  - `average_power_watts` (integer, optional)
  - `elevation_gain_meters` (integer, optional)
  - `rpe` (integer, optional - Rate of Perceived Exertion 1-10)
  - `workout_notes` (text, optional)
  - `weather_conditions` (text, optional)
  - `equipment_used` (text, optional)
  - `feeling` (text, optional: great/good/okay/tired/exhausted)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 7. `race_goals`
  Target splits and race day strategy
  - `id` (uuid, primary key)
  - `race_id` (uuid, references user_races)
  - `swim_goal_minutes` (integer, optional)
  - `t1_goal_minutes` (integer, optional)
  - `bike_goal_minutes` (integer, optional)
  - `t2_goal_minutes` (integer, optional)
  - `run_goal_minutes` (integer, optional)
  - `nutrition_strategy` (text, optional)
  - `pacing_strategy` (text, optional)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to manage only their own data
  - Ensure complete data isolation between users

  ## Notes
  1. All distance measurements stored in meters for consistency
  2. All duration measurements stored in minutes
  3. Pace stored as seconds per kilometer for easy calculations
  4. Users can have multiple races but typically one primary race
  5. Workouts can exist without a formal training plan (ad-hoc logging)
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  weight_kg decimal,
  age integer,
  gender text,
  experience_level text DEFAULT 'beginner',
  units_preference text DEFAULT 'metric',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_races table
CREATE TABLE IF NOT EXISTS user_races (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  race_name text NOT NULL,
  race_date date NOT NULL,
  race_location text,
  distance_type text NOT NULL,
  goal_finish_time_minutes integer,
  registration_status text,
  course_notes text,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create athlete_metrics table
CREATE TABLE IF NOT EXISTS athlete_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  ftp_watts integer,
  swim_css_pace_per_100m integer,
  run_threshold_pace_per_km integer,
  max_heart_rate integer,
  resting_heart_rate integer,
  updated_at timestamptz DEFAULT now()
);

-- Create training_plans table
CREATE TABLE IF NOT EXISTS training_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  race_id uuid REFERENCES user_races(id) ON DELETE CASCADE,
  plan_name text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  weeks_duration integer NOT NULL,
  weekly_hours_available decimal,
  plan_type text DEFAULT 'custom',
  created_at timestamptz DEFAULT now()
);

-- Create planned_workouts table
CREATE TABLE IF NOT EXISTS planned_workouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  plan_id uuid REFERENCES training_plans(id) ON DELETE CASCADE,
  workout_date date NOT NULL,
  discipline text NOT NULL,
  workout_type text,
  planned_duration_minutes integer,
  planned_distance_meters integer,
  intensity_zone text,
  description text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create completed_workouts table
CREATE TABLE IF NOT EXISTS completed_workouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  planned_workout_id uuid REFERENCES planned_workouts(id) ON DELETE SET NULL,
  workout_date date NOT NULL,
  discipline text NOT NULL,
  actual_duration_minutes integer NOT NULL,
  actual_distance_meters integer,
  average_pace_per_km integer,
  average_heart_rate integer,
  average_power_watts integer,
  elevation_gain_meters integer,
  rpe integer,
  workout_notes text,
  weather_conditions text,
  equipment_used text,
  feeling text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create race_goals table
CREATE TABLE IF NOT EXISTS race_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  race_id uuid REFERENCES user_races(id) ON DELETE CASCADE NOT NULL UNIQUE,
  swim_goal_minutes integer,
  t1_goal_minutes integer,
  bike_goal_minutes integer,
  t2_goal_minutes integer,
  run_goal_minutes integer,
  nutrition_strategy text,
  pacing_strategy text,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_races ENABLE ROW LEVEL SECURITY;
ALTER TABLE athlete_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE planned_workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE completed_workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE race_goals ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- User races policies
CREATE POLICY "Users can view own races"
  ON user_races FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own races"
  ON user_races FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own races"
  ON user_races FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own races"
  ON user_races FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Athlete metrics policies
CREATE POLICY "Users can view own metrics"
  ON athlete_metrics FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own metrics"
  ON athlete_metrics FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own metrics"
  ON athlete_metrics FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Training plans policies
CREATE POLICY "Users can view own plans"
  ON training_plans FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own plans"
  ON training_plans FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own plans"
  ON training_plans FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own plans"
  ON training_plans FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Planned workouts policies
CREATE POLICY "Users can view own planned workouts"
  ON planned_workouts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own planned workouts"
  ON planned_workouts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own planned workouts"
  ON planned_workouts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own planned workouts"
  ON planned_workouts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Completed workouts policies
CREATE POLICY "Users can view own completed workouts"
  ON completed_workouts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completed workouts"
  ON completed_workouts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own completed workouts"
  ON completed_workouts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own completed workouts"
  ON completed_workouts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Race goals policies
CREATE POLICY "Users can view own race goals"
  ON race_goals FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_races
      WHERE user_races.id = race_goals.race_id
      AND user_races.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own race goals"
  ON race_goals FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_races
      WHERE user_races.id = race_goals.race_id
      AND user_races.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own race goals"
  ON race_goals FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_races
      WHERE user_races.id = race_goals.race_id
      AND user_races.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_races
      WHERE user_races.id = race_goals.race_id
      AND user_races.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own race goals"
  ON race_goals FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_races
      WHERE user_races.id = race_goals.race_id
      AND user_races.user_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_races_user_id ON user_races(user_id);
CREATE INDEX IF NOT EXISTS idx_user_races_date ON user_races(race_date);
CREATE INDEX IF NOT EXISTS idx_training_plans_user_id ON training_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_planned_workouts_user_id ON planned_workouts(user_id);
CREATE INDEX IF NOT EXISTS idx_planned_workouts_date ON planned_workouts(workout_date);
CREATE INDEX IF NOT EXISTS idx_completed_workouts_user_id ON completed_workouts(user_id);
CREATE INDEX IF NOT EXISTS idx_completed_workouts_date ON completed_workouts(workout_date);
