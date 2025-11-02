/*
  # Add Unique Constraint for Completed Workouts

  ## Changes
  This migration adds a unique constraint to prevent the same planned workout from being completed multiple times.
  
  1. Changes to `completed_workouts` table
    - Add unique constraint on (user_id, planned_workout_id) where planned_workout_id IS NOT NULL
    - This ensures each planned workout can only be completed once per user
    - Standalone completed workouts (with planned_workout_id = NULL) can still be added multiple times
  
  ## Security
  No changes to RLS policies - existing policies remain in place
  
  ## Notes
  - Uses a partial unique index to only apply the constraint when planned_workout_id is not null
  - This allows multiple standalone workouts (where planned_workout_id is null) while preventing duplicate completions of the same planned workout
*/

-- Add unique constraint to prevent completing the same planned workout multiple times
-- Uses a partial index so it only applies when planned_workout_id is not null
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_completed_planned_workout
  ON completed_workouts (user_id, planned_workout_id)
  WHERE planned_workout_id IS NOT NULL;
