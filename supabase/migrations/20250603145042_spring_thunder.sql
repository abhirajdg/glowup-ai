/*
  # Initial Schema Setup for GlowUp.AI

  1. New Tables
    - profiles: User profile information
    - generated_content: AI-generated content for users
    - interview_sessions: Mock interview data
    - career_goals: Career planning and progress

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Ensure users can only access their own data

  3. Performance
    - Add indexes for common queries
    - Set up updated_at triggers
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  full_name text,
  "current_role" text,
  industry text,
  expertise text[],
  interests text[],
  target_audience text,
  linkedin_url text,
  github_url text,
  branding_data jsonb,
  visibility text DEFAULT 'private'
);

-- Create generated_content table
CREATE TABLE IF NOT EXISTS generated_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  content_type text NOT NULL,
  title text NOT NULL,
  content jsonb NOT NULL,
  metadata jsonb
);

-- Create interview_sessions table
CREATE TABLE IF NOT EXISTS interview_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  track text NOT NULL,
  level text NOT NULL,
  questions jsonb[],
  answers jsonb[],
  feedback jsonb,
  score integer
);

-- Create career_goals table
CREATE TABLE IF NOT EXISTS career_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  short_term_goals text[],
  long_term_goals text[],
  skill_gaps jsonb,
  action_items jsonb,
  progress jsonb
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_goals ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view own profile'
  ) THEN
    CREATE POLICY "Users can view own profile"
      ON profiles FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile"
      ON profiles FOR UPDATE
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'generated_content' AND policyname = 'Users can view own generated content'
  ) THEN
    CREATE POLICY "Users can view own generated content"
      ON generated_content FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'generated_content' AND policyname = 'Users can create own generated content'
  ) THEN
    CREATE POLICY "Users can create own generated content"
      ON generated_content FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'generated_content' AND policyname = 'Users can update own generated content'
  ) THEN
    CREATE POLICY "Users can update own generated content"
      ON generated_content FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'generated_content' AND policyname = 'Users can delete own generated content'
  ) THEN
    CREATE POLICY "Users can delete own generated content"
      ON generated_content FOR DELETE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'interview_sessions' AND policyname = 'Users can view own interview sessions'
  ) THEN
    CREATE POLICY "Users can view own interview sessions"
      ON interview_sessions FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'interview_sessions' AND policyname = 'Users can create own interview sessions'
  ) THEN
    CREATE POLICY "Users can create own interview sessions"
      ON interview_sessions FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'interview_sessions' AND policyname = 'Users can update own interview sessions'
  ) THEN
    CREATE POLICY "Users can update own interview sessions"
      ON interview_sessions FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'career_goals' AND policyname = 'Users can view own career goals'
  ) THEN
    CREATE POLICY "Users can view own career goals"
      ON career_goals FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'career_goals' AND policyname = 'Users can update own career goals'
  ) THEN
    CREATE POLICY "Users can update own career goals"
      ON career_goals FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_linkedin_url ON profiles(linkedin_url);
CREATE INDEX IF NOT EXISTS idx_generated_content_type ON generated_content(content_type);
CREATE INDEX IF NOT EXISTS idx_interview_sessions_track_level ON interview_sessions(track, level);
CREATE INDEX IF NOT EXISTS idx_career_goals_updated_at ON career_goals(updated_at);

-- Add triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_generated_content_updated_at
    BEFORE UPDATE ON generated_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_career_goals_updated_at
    BEFORE UPDATE ON career_goals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();