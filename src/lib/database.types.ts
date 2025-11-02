export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          weight_kg: number | null
          age: number | null
          gender: string | null
          experience_level: string
          units_preference: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          weight_kg?: number | null
          age?: number | null
          gender?: string | null
          experience_level?: string
          units_preference?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          weight_kg?: number | null
          age?: number | null
          gender?: string | null
          experience_level?: string
          units_preference?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_races: {
        Row: {
          id: string
          user_id: string
          race_name: string
          race_date: string
          race_location: string | null
          distance_type: string
          goal_finish_time_minutes: number | null
          registration_status: string | null
          course_notes: string | null
          is_primary: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          race_name: string
          race_date: string
          race_location?: string | null
          distance_type: string
          goal_finish_time_minutes?: number | null
          registration_status?: string | null
          course_notes?: string | null
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          race_name?: string
          race_date?: string
          race_location?: string | null
          distance_type?: string
          goal_finish_time_minutes?: number | null
          registration_status?: string | null
          course_notes?: string | null
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      athlete_metrics: {
        Row: {
          id: string
          user_id: string
          ftp_watts: number | null
          swim_css_pace_per_100m: number | null
          run_threshold_pace_per_km: number | null
          max_heart_rate: number | null
          resting_heart_rate: number | null
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          ftp_watts?: number | null
          swim_css_pace_per_100m?: number | null
          run_threshold_pace_per_km?: number | null
          max_heart_rate?: number | null
          resting_heart_rate?: number | null
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          ftp_watts?: number | null
          swim_css_pace_per_100m?: number | null
          run_threshold_pace_per_km?: number | null
          max_heart_rate?: number | null
          resting_heart_rate?: number | null
          updated_at?: string
        }
      }
      training_plans: {
        Row: {
          id: string
          user_id: string
          race_id: string | null
          plan_name: string
          start_date: string
          end_date: string
          weeks_duration: number
          weekly_hours_available: number | null
          plan_type: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          race_id?: string | null
          plan_name: string
          start_date: string
          end_date: string
          weeks_duration: number
          weekly_hours_available?: number | null
          plan_type?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          race_id?: string | null
          plan_name?: string
          start_date?: string
          end_date?: string
          weeks_duration?: number
          weekly_hours_available?: number | null
          plan_type?: string
          created_at?: string
        }
      }
      planned_workouts: {
        Row: {
          id: string
          user_id: string
          plan_id: string | null
          workout_date: string
          discipline: string
          workout_type: string | null
          planned_duration_minutes: number | null
          planned_distance_meters: number | null
          intensity_zone: string | null
          description: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id?: string | null
          workout_date: string
          discipline: string
          workout_type?: string | null
          planned_duration_minutes?: number | null
          planned_distance_meters?: number | null
          intensity_zone?: string | null
          description?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string | null
          workout_date?: string
          discipline?: string
          workout_type?: string | null
          planned_duration_minutes?: number | null
          planned_distance_meters?: number | null
          intensity_zone?: string | null
          description?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      completed_workouts: {
        Row: {
          id: string
          user_id: string
          planned_workout_id: string | null
          workout_date: string
          discipline: string
          actual_duration_minutes: number
          actual_distance_meters: number | null
          average_pace_per_km: number | null
          average_heart_rate: number | null
          average_power_watts: number | null
          elevation_gain_meters: number | null
          rpe: number | null
          workout_notes: string | null
          weather_conditions: string | null
          equipment_used: string | null
          feeling: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          planned_workout_id?: string | null
          workout_date: string
          discipline: string
          actual_duration_minutes: number
          actual_distance_meters?: number | null
          average_pace_per_km?: number | null
          average_heart_rate?: number | null
          average_power_watts?: number | null
          elevation_gain_meters?: number | null
          rpe?: number | null
          workout_notes?: string | null
          weather_conditions?: string | null
          equipment_used?: string | null
          feeling?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          planned_workout_id?: string | null
          workout_date?: string
          discipline?: string
          actual_duration_minutes?: number
          actual_distance_meters?: number | null
          average_pace_per_km?: number | null
          average_heart_rate?: number | null
          average_power_watts?: number | null
          elevation_gain_meters?: number | null
          rpe?: number | null
          workout_notes?: string | null
          weather_conditions?: string | null
          equipment_used?: string | null
          feeling?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      race_goals: {
        Row: {
          id: string
          race_id: string
          swim_goal_minutes: number | null
          t1_goal_minutes: number | null
          bike_goal_minutes: number | null
          t2_goal_minutes: number | null
          run_goal_minutes: number | null
          nutrition_strategy: string | null
          pacing_strategy: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          race_id: string
          swim_goal_minutes?: number | null
          t1_goal_minutes?: number | null
          bike_goal_minutes?: number | null
          t2_goal_minutes?: number | null
          run_goal_minutes?: number | null
          nutrition_strategy?: string | null
          pacing_strategy?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          race_id?: string
          swim_goal_minutes?: number | null
          t1_goal_minutes?: number | null
          bike_goal_minutes?: number | null
          t2_goal_minutes?: number | null
          run_goal_minutes?: number | null
          nutrition_strategy?: string | null
          pacing_strategy?: string | null
          updated_at?: string
        }
      }
    }
  }
}
