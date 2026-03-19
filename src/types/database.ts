// ──────────────────────────────────────────────
// AlgoForge — Database Types (mirrors Supabase schema)
// Auto-generate later with: npx supabase gen types typescript
// For now this is manually maintained to match 001_initial_schema.sql
// ──────────────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          email: string
          avatar_url: string | null
          streak: number
          rating: number
          last_active_at: string
          created_at: string
        }
        Insert: {
          id: string
          username: string
          email: string
          avatar_url?: string | null
          streak?: number
          rating?: number
          last_active_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          avatar_url?: string | null
          streak?: number
          rating?: number
          last_active_at?: string
          created_at?: string
        }
      }
      problems: {
        Row: {
          id: string
          slug: string
          title: string
          difficulty: 'Easy' | 'Medium' | 'Hard'
          topics: string[]
          companies: string[]
          description: string
          constraints: string | null
          test_cases: TestCaseJson[]
          hints: string[]
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          difficulty: 'Easy' | 'Medium' | 'Hard'
          topics?: string[]
          companies?: string[]
          description: string
          constraints?: string | null
          test_cases: TestCaseJson[]
          hints?: string[]
          created_at?: string
        }
        Update: {
          slug?: string
          title?: string
          difficulty?: 'Easy' | 'Medium' | 'Hard'
          topics?: string[]
          companies?: string[]
          description?: string
          constraints?: string | null
          test_cases?: TestCaseJson[]
          hints?: string[]
        }
      }
      submissions: {
        Row: {
          id: string
          user_id: string
          problem_id: string
          code: string
          language: 'python' | 'javascript' | 'typescript' | 'java' | 'cpp'
          status: SubmissionStatusType
          runtime_ms: number | null
          test_results: TestResultJson[]
          ai_analysis: AiAnalysisJson | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          problem_id: string
          code: string
          language: 'python' | 'javascript' | 'typescript' | 'java' | 'cpp'
          status?: SubmissionStatusType
          runtime_ms?: number | null
          test_results?: TestResultJson[]
          ai_analysis?: AiAnalysisJson | null
          created_at?: string
        }
        Update: {
          status?: SubmissionStatusType
          runtime_ms?: number | null
          test_results?: TestResultJson[]
          ai_analysis?: AiAnalysisJson | null
        }
      }
      user_topic_progress: {
        Row: {
          user_id: string
          topic: string
          solved: number
          total: number
          last_solved_at: string | null
        }
        Insert: {
          user_id: string
          topic: string
          solved?: number
          total?: number
          last_solved_at?: string | null
        }
        Update: {
          solved?: number
          total?: number
          last_solved_at?: string | null
        }
      }
      groups: {
        Row: {
          id: string
          name: string
          description: string | null
          owner_id: string
          member_count: number
          current_topic: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          owner_id: string
          member_count?: number
          current_topic?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          member_count?: number
          current_topic?: string | null
          is_active?: boolean
        }
      }
      group_members: {
        Row: {
          group_id: string
          user_id: string
          role: 'owner' | 'admin' | 'member'
          joined_at: string
        }
        Insert: {
          group_id: string
          user_id: string
          role?: 'owner' | 'admin' | 'member'
          joined_at?: string
        }
        Update: {
          role?: 'owner' | 'admin' | 'member'
        }
      }
      threads: {
        Row: {
          id: string
          problem_id: string | null
          group_id: string | null
          author_id: string
          title: string
          body_md: string
          tag: 'Help Needed' | 'Solution Share' | 'Challenge' | 'Discussion' | null
          upvotes: number
          reply_count: number
          created_at: string
        }
        Insert: {
          id?: string
          problem_id?: string | null
          group_id?: string | null
          author_id: string
          title: string
          body_md: string
          tag?: 'Help Needed' | 'Solution Share' | 'Challenge' | 'Discussion' | null
          upvotes?: number
          reply_count?: number
          created_at?: string
        }
        Update: {
          title?: string
          body_md?: string
          tag?: 'Help Needed' | 'Solution Share' | 'Challenge' | 'Discussion' | null
          upvotes?: number
          reply_count?: number
        }
      }
      replies: {
        Row: {
          id: string
          thread_id: string
          author_id: string
          body_md: string
          upvotes: number
          created_at: string
        }
        Insert: {
          id?: string
          thread_id: string
          author_id: string
          body_md: string
          upvotes?: number
          created_at?: string
        }
        Update: {
          body_md?: string
          upvotes?: number
        }
      }
      contests: {
        Row: {
          id: string
          title: string
          start_time: string
          end_time: string
          problem_ids: string[]
          status: 'UPCOMING' | 'LIVE' | 'ENDED'
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          start_time: string
          end_time: string
          problem_ids?: string[]
          status?: 'UPCOMING' | 'LIVE' | 'ENDED'
          created_at?: string
        }
        Update: {
          title?: string
          start_time?: string
          end_time?: string
          problem_ids?: string[]
          status?: 'UPCOMING' | 'LIVE' | 'ENDED'
        }
      }
      contest_participants: {
        Row: {
          contest_id: string
          user_id: string
          score: number
          rank: number | null
          problems_solved: number
          time_penalties: Record<string, number>
        }
        Insert: {
          contest_id: string
          user_id: string
          score?: number
          rank?: number | null
          problems_solved?: number
          time_penalties?: Record<string, number>
        }
        Update: {
          score?: number
          rank?: number | null
          problems_solved?: number
          time_penalties?: Record<string, number>
        }
      }
    }
  }
}

// json column types
type SubmissionStatusType =
  | 'PENDING'
  | 'RUNNING'
  | 'ACCEPTED'
  | 'WRONG_ANSWER'
  | 'TIME_LIMIT_EXCEEDED'
  | 'RUNTIME_ERROR'
  | 'COMPILATION_ERROR'

interface TestCaseJson {
  input: string
  expected_output: string
  is_sample: boolean
}

interface TestResultJson {
  test_case_id: number
  passed: boolean
  input: string
  expected_output: string
  actual_output: string
  runtime_ms: number
}

interface AiAnalysisJson {
  conceptual_mistake: string
  correct_mental_model: string
  code_scaffold: string
  prerequisite_problem: {
    slug: string
    title: string
    reason: string
  }
}
