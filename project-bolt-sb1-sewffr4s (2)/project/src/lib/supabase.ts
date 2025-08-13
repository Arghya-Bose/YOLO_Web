import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables and provide helpful error messages
if (!supabaseUrl || supabaseUrl === 'your-project-url-here' || !supabaseUrl.startsWith('https://')) {
  console.warn('⚠️  Supabase URL not configured. Using demo mode.');
  console.log('To enable full functionality:');
  console.log('1. Create a Supabase project at https://supabase.com');
  console.log('2. Update VITE_SUPABASE_URL in .env with your project URL');
  console.log('3. Update VITE_SUPABASE_ANON_KEY in .env with your anon key');
  console.log('4. Restart the development server');
}

if (!supabaseAnonKey || supabaseAnonKey === 'your-anon-key-here') {
  console.warn('⚠️  Supabase Anon Key not configured. Using demo mode.');
}

// Create client with fallback values for demo mode
const validUrl = supabaseUrl && supabaseUrl.startsWith('https://') ? supabaseUrl : 'https://demo.supabase.co';
const validKey = supabaseAnonKey && supabaseAnonKey !== 'your-anon-key-here' ? supabaseAnonKey : 'demo-key';

export const supabase = createClient(validUrl, validKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          enrolled_at: string;
          progress: number;
          completed: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          enrolled_at?: string;
          progress?: number;
          completed?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          enrolled_at?: string;
          progress?: number;
          completed?: boolean;
        };
      };
      exam_results: {
        Row: {
          id: string;
          user_id: string;
          exam_id: string;
          score: number;
          passed: boolean;
          answers: Record<string, number>;
          completed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          exam_id: string;
          score: number;
          passed: boolean;
          answers: Record<string, number>;
          completed_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          exam_id?: string;
          score?: number;
          passed?: boolean;
          answers?: Record<string, number>;
          completed_at?: string;
        };
      };
    };
  };
}