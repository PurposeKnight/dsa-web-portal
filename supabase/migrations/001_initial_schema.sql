-- ──────────────────────────────────────────────
-- AlgoForge — Initial Database Schema
-- Run with: npx supabase db push
-- ──────────────────────────────────────────────

-- enable uuid generation
create extension if not exists "uuid-ossp";

-- ── Users ───────────────────────────────────────

create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  email text unique not null,
  avatar_url text,
  streak integer default 0,
  rating integer default 1200,
  last_active_at timestamptz default now(),
  created_at timestamptz default now()
);

-- ── Problems ────────────────────────────────────

create table if not exists problems (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  difficulty text not null check (difficulty in ('Easy', 'Medium', 'Hard')),
  topics text[] default '{}',
  companies text[] default '{}',
  description text not null,
  constraints text,
  test_cases jsonb not null default '[]',
  hints jsonb default '[]',
  created_at timestamptz default now()
);

-- ── Submissions ─────────────────────────────────

create table if not exists submissions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  problem_id uuid not null references problems(id) on delete cascade,
  code text not null,
  language text not null check (language in ('python', 'javascript', 'typescript', 'java', 'cpp')),
  status text not null default 'PENDING' check (
    status in ('PENDING', 'RUNNING', 'ACCEPTED', 'WRONG_ANSWER', 'TIME_LIMIT_EXCEEDED', 'RUNTIME_ERROR', 'COMPILATION_ERROR')
  ),
  runtime_ms integer,
  test_results jsonb default '[]',
  ai_analysis jsonb,
  created_at timestamptz default now()
);

-- ── User Topic Progress ─────────────────────────

create table if not exists user_topic_progress (
  user_id uuid not null references users(id) on delete cascade,
  topic text not null,
  solved integer default 0,
  total integer default 0,
  last_solved_at timestamptz,
  primary key (user_id, topic)
);

-- ── Groups ──────────────────────────────────────

create table if not exists groups (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  owner_id uuid not null references users(id) on delete cascade,
  member_count integer default 1,
  current_topic text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ── Group Members ───────────────────────────────

create table if not exists group_members (
  group_id uuid not null references groups(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text default 'member' check (role in ('owner', 'admin', 'member')),
  joined_at timestamptz default now(),
  primary key (group_id, user_id)
);

-- ── Threads ─────────────────────────────────────

create table if not exists threads (
  id uuid primary key default uuid_generate_v4(),
  problem_id uuid references problems(id) on delete set null,
  group_id uuid references groups(id) on delete set null,
  author_id uuid not null references users(id) on delete cascade,
  title text not null,
  body_md text not null,
  tag text check (tag in ('Help Needed', 'Solution Share', 'Challenge', 'Discussion')),
  upvotes integer default 0,
  reply_count integer default 0,
  created_at timestamptz default now()
);

-- ── Replies ─────────────────────────────────────

create table if not exists replies (
  id uuid primary key default uuid_generate_v4(),
  thread_id uuid not null references threads(id) on delete cascade,
  author_id uuid not null references users(id) on delete cascade,
  body_md text not null,
  upvotes integer default 0,
  created_at timestamptz default now()
);

-- ── Contests ────────────────────────────────────

create table if not exists contests (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  problem_ids uuid[] default '{}',
  status text default 'UPCOMING' check (status in ('UPCOMING', 'LIVE', 'ENDED')),
  created_at timestamptz default now()
);

-- ── Contest Participants ────────────────────────

create table if not exists contest_participants (
  contest_id uuid not null references contests(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  score integer default 0,
  rank integer,
  problems_solved integer default 0,
  time_penalties jsonb default '{}',
  primary key (contest_id, user_id)
);

-- ── Indexes ─────────────────────────────────────

create index if not exists idx_problems_difficulty on problems(difficulty);
create index if not exists idx_problems_slug on problems(slug);
create index if not exists idx_submissions_user on submissions(user_id);
create index if not exists idx_submissions_problem on submissions(problem_id);
create index if not exists idx_submissions_status on submissions(status);
create index if not exists idx_threads_tag on threads(tag);
create index if not exists idx_threads_group on threads(group_id);
create index if not exists idx_threads_author on threads(author_id);
create index if not exists idx_group_members_user on group_members(user_id);
create index if not exists idx_contest_participants_user on contest_participants(user_id);
