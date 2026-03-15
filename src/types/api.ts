// ──────────────────────────────────────────────
// AlgoForge — Shared Type Definitions
// Contract between Frontend (Dev A) and Backend (Dev B)
// ──────────────────────────────────────────────

// ── Enums & Unions ──────────────────────────────

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Language = 'python' | 'javascript' | 'typescript' | 'java' | 'cpp';

export type SubmissionStatus =
  | 'PENDING'
  | 'RUNNING'
  | 'ACCEPTED'
  | 'WRONG_ANSWER'
  | 'TIME_LIMIT_EXCEEDED'
  | 'RUNTIME_ERROR'
  | 'COMPILATION_ERROR';

export type ThreadTag = 'Help Needed' | 'Solution Share' | 'Challenge' | 'Discussion';

export type ContestStatus = 'UPCOMING' | 'LIVE' | 'ENDED';

export type ContestProblemStatus = 'solved' | 'attempted' | 'untouched';

// ── User ────────────────────────────────────────

export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url: string | null;
  streak: number;
  rating: number;
  created_at: string;
}

// ── Problems ────────────────────────────────────

export interface TestCase {
  input: string;
  expected_output: string;
  is_sample: boolean;
}

export interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  topics: string[];
  companies: string[];
  description: string;
  constraints: string;
  test_cases: TestCase[];
  hints: string[];
  solved?: boolean;
}

export interface ProblemListItem {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  topics: string[];
  companies: string[];
  solved: boolean;
}

// ── Submissions ─────────────────────────────────

export interface TestResult {
  test_case_id: number;
  passed: boolean;
  input: string;
  expected_output: string;
  actual_output: string;
  runtime_ms: number;
}

export interface Submission {
  id: string;
  user_id: string;
  problem_id: string;
  code: string;
  language: Language;
  status: SubmissionStatus;
  runtime_ms: number | null;
  test_results: TestResult[];
  ai_analysis: AIAnalysis | null;
  created_at: string;
}

// ── AI Analysis ─────────────────────────────────

export interface AIAnalysis {
  conceptual_mistake: string;
  correct_mental_model: string;
  code_scaffold: string;
  prerequisite_problem: {
    slug: string;
    title: string;
    reason: string;
  };
}

export interface Hint {
  level: 1 | 2 | 3;
  content: string;
}

export interface Explanation {
  concept: string;
  explanation: string;
  time_complexity: string;
  space_complexity: string;
}

// ── Topic Progress ──────────────────────────────

export interface TopicProgress {
  topic: string;
  solved: number;
  total: number;
  percentage: number;
  last_solved_at: string | null;
}

// ── Dashboard ───────────────────────────────────

export interface DashboardStats {
  problems_solved: number;
  streak: number;
  contest_rating: number;
  weekly_goal: {
    current: number;
    target: number;
  };
}

export interface AIRecommendation {
  problem_slug: string;
  problem_title: string;
  difficulty: Difficulty;
  reason: string;
}

export interface HeatmapDay {
  date: string;
  count: number;
}

export interface FeedItem {
  id: string;
  user: {
    username: string;
    avatar_url: string | null;
  };
  action: string;
  target: string;
  timestamp: string;
}

// ── Community ───────────────────────────────────

export interface Thread {
  id: string;
  problem_id: string | null;
  group_id: string | null;
  author: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
  title: string;
  body_md: string;
  tag: ThreadTag;
  upvotes: number;
  reply_count: number;
  created_at: string;
}

export interface Reply {
  id: string;
  thread_id: string;
  author: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
  body_md: string;
  upvotes: number;
  created_at: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  member_count: number;
  current_topic: string;
  is_active: boolean;
  is_member: boolean;
}

// ── Contest ──────────────────────────────────────

export interface Contest {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  status: ContestStatus;
  problem_ids: string[];
}

export interface ContestProblem {
  id: string;
  letter: string;
  title: string;
  difficulty: Difficulty;
  points: number;
  status: ContestProblemStatus;
}

export interface ContestParticipant {
  contest_id: string;
  user_id: string;
  score: number;
  rank: number;
  problems_solved: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
  score: number;
  problems_solved: number;
}

export interface ContestPostMortem {
  contest_id: string;
  analysis: string;
  recovery_plan: string[];
  locked: boolean;
}
