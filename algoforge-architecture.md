# AlgoForge — Three-Tier Architecture

> **Stack:** Next.js 14 (App Router) · TypeScript · Supabase · Judge0 · Anthropic Claude API · BullMQ · Redis · Vercel · Railway

---

## Overview

AlgoForge is structured as a strict three-tier architecture. The tiers communicate only downward — the presentation layer never touches the database directly, and the data layer never holds business logic.

```
┌──────────────────────────────────────────────────────┐
│           Tier 1 — Presentation                       │
│         Next.js 14 App Router + TypeScript            │
└──────────────────┬───────────────────────────────────┘
                   │  REST · Server Actions · Supabase client
┌──────────────────▼───────────────────────────────────┐
│        Tier 2 — Application & Business Logic          │
│     Next.js API routes · BullMQ workers · AI engine   │
└──────────────────┬───────────────────────────────────┘
                   │  SQL · Realtime subscriptions · gRPC
┌──────────────────▼───────────────────────────────────┐
│           Tier 3 — Data & Infrastructure              │
│    Supabase · Judge0 · Redis · Anthropic · Vercel     │
└──────────────────────────────────────────────────────┘
```

---

## Tier 1 — Presentation

**Runtime:** Vercel Edge / Node.js  
**Framework:** Next.js 14 App Router, TypeScript, Tailwind CSS

All UI lives here. Server components handle data fetching at the route level; client components are used only where interactivity requires them (Monaco editor, realtime feed, contest timer). State is managed with Zustand for lightweight client-side needs.

### Pages

| Route | Component | Notes |
|---|---|---|
| `/` | Dashboard | Streak, topic mastery, activity heatmap, AI-curated pick |
| `/problems` | Problem list | Filter by topic, company, difficulty, solved status |
| `/problems/[slug]` | Problem editor | Monaco editor + test runner + AI panel |
| `/community` | Community | Discussion threads, study groups, group feed |
| `/contest` | Contest | Live timer, problem list, live leaderboard |
| `/contest/[id]/results` | Post-mortem | AI contest analysis, recovery plan |

### Shared frontend modules

```
src/
├── app/                        # Next.js App Router pages
│   ├── (auth)/                 # Login / register routes
│   ├── dashboard/
│   ├── problems/
│   ├── community/
│   └── contest/
├── components/
│   ├── ui/                     # Button, Card, Badge, Input, Modal
│   ├── editor/                 # Monaco wrapper, language selector
│   ├── ai-panel/               # WhyWrong, HintPanel, ExplainPanel
│   ├── contest/                # Timer, Leaderboard, ProblemRow
│   └── community/              # ThreadCard, GroupCard, FeedItem
├── hooks/                      # useStreak, useRealtime, useContest
├── lib/
│   ├── supabase/               # Supabase browser client
│   └── api/                    # Typed fetch wrappers for API routes
├── store/                      # Zustand stores
└── types/                      # Shared TypeScript types (also used by Tier 2)
```

### Key frontend decisions

- **Server components by default.** Only opt into `"use client"` for Monaco, real-time subscriptions, and the contest timer.
- **Next.js Server Actions** for all mutations (submit code, create thread, join group). No separate REST call needed for simple writes.
- **Supabase browser client** for auth session and realtime channel subscriptions directly from the client.
- **Optimistic UI** on thread upvotes and problem solve status using Zustand + React Query.

---

## Tier 2 — Application & Business Logic

**Runtime:** Node.js 20  
**Location:** `src/app/api/` (Next.js API routes) + standalone BullMQ workers

This tier owns all domain logic. It is the only layer allowed to call Tier 3 services. The AI engine, judge queue, and scoring engine all live here.

### Services

#### Auth service
- Validates Supabase JWT on every protected API route via middleware
- Enforces Row Level Security (RLS) policies at the DB boundary
- Wraps Supabase OAuth (GitHub, Google) and magic link flows

```
src/app/api/auth/
├── callback/route.ts           # OAuth redirect handler
└── middleware.ts               # JWT validation for all /api/* routes
```

#### Problem service
- Serves filtered, paginated problem lists
- Handles problem seeding (Blind 75 + extras) via admin scripts

```
src/app/api/problems/
├── route.ts                    # GET /api/problems?topic=&company=&difficulty=
└── [slug]/route.ts             # GET /api/problems/:slug
```

#### Submission service
- Receives code + language from the editor
- Enqueues a judge job via BullMQ
- Polls Judge0 result and persists to `submissions` table
- Triggers AI engine if status is `WRONG_ANSWER`

```
src/app/api/submissions/
├── route.ts                    # POST /api/submissions
└── [id]/route.ts               # GET /api/submissions/:id (poll result)

workers/
└── judge.worker.ts             # BullMQ worker — calls Judge0, grades, notifies
```

#### AI engine (Claude API)
The unique differentiator. Never called directly from the frontend.

```
src/lib/ai/
├── why-wrong.ts                # Diagnoses conceptual gap on wrong submissions
├── hint-generator.ts           # 3-level progressive hints
├── explain.ts                  # Concept explainer for any problem
├── recommender.ts              # Weak-topic detection → next problem suggestion
├── post-mortem.ts              # Contest performance analysis + 3-day recovery plan
└── prompts/                    # Structured system + user prompt templates
```

**Prompt strategy for why-wrong:** The prompt sends the problem statement, the expected time complexity, and the user's submission. Claude is instructed to identify the *conceptual model* the user was applying, contrast it with the model that satisfies the complexity constraint, and suggest a specific prerequisite problem — without giving away the solution.

#### Community service
- CRUD for threads and replies
- Group create/join/leave
- Realtime fan-out via Supabase Realtime channels (server publishes, clients subscribe)

#### Contest service
- Contest creation and problem assignment (admin)
- Submission scoring: `points - (wrong_attempts × 10_minute_penalty)`
- Leaderboard calculation run on each accepted submission
- Post-contest triggers AI post-mortem generation

### BullMQ queue topology

```
Redis (Upstash)
└── judge-queue
    ├── workers: 4 concurrent
    ├── attempts: 3
    ├── backoff: exponential 2s
    └── DLQ: judge-failed
```

---

## Tier 3 — Data & Infrastructure

### Supabase (Postgres + Auth + Realtime + Storage)

Primary data store. All tables use Row Level Security.

#### Schema

```sql
-- Users
users (id, username, email, avatar_url, streak, rating, created_at)

-- Problems
problems (id, slug, title, difficulty, topic[], company[], description,
          test_cases jsonb, constraints, hints jsonb)

-- Submissions
submissions (id, user_id, problem_id, code, language, status,
             runtime_ms, ai_analysis jsonb, created_at)

-- Progress
user_topic_progress (user_id, topic, solved, total, last_solved_at)

-- Community
groups (id, name, description, owner_id, member_count, current_topic)
group_members (group_id, user_id, role, joined_at)
threads (id, problem_id, group_id, author_id, title, body_md, tag,
         upvotes, created_at)
replies (id, thread_id, author_id, body_md, upvotes, created_at)

-- Contests
contests (id, title, start_time, end_time, problem_ids[], status)
contest_participants (contest_id, user_id, score, rank, problems_solved,
                      time_penalties jsonb)
```

#### Realtime channels

| Channel | Publisher | Subscribers |
|---|---|---|
| `contest:{id}:leaderboard` | Contest service (on accepted submission) | All contest participants |
| `group:{id}:feed` | Community service (on solve/post) | Group members |

### Judge0

- Self-hosted on Railway (or Judge0 Cloud for MVP)
- Supports: Python 3, JavaScript, TypeScript, Java, C++, C
- Called only by the BullMQ judge worker — never directly from the frontend

### Redis (Upstash)

- BullMQ job broker
- Rate limiting: 10 code submissions/min per user, 20 AI requests/min per user
- Session cache for contest leaderboard (TTL 5s, avoids DB read on every submission)

### Anthropic Claude API

- Model: `claude-sonnet-4-20250514`
- Called only from `src/lib/ai/` — never from API routes directly
- Responses cached in `submissions.ai_analysis` (JSONB) to avoid repeat charges on the same submission

### Cron jobs (Vercel Cron)

| Job | Schedule | Action |
|---|---|---|
| Streak reset | Daily 00:00 IST | Checks `last_active_at`, resets streak if > 24h gap |
| Weekly contest create | Friday 18:00 IST | Seeds new contest with 5 problems |
| Rating recalculation | After each contest | Updates `users.rating` using Elo-style delta |

---

## Data flow — code submission

```
User submits code
      │
      ▼
POST /api/submissions          (Tier 2 — submission service)
      │
      ├─► INSERT submissions (status: PENDING)
      │
      ▼
BullMQ enqueue judge job
      │
      ▼
judge.worker.ts calls Judge0    (Tier 3)
      │
      ├─ ACCEPTED ──► UPDATE submissions (status: ACCEPTED)
      │                └─► UPDATE user_topic_progress
      │
      └─ WRONG_ANSWER ─► UPDATE submissions (status: WRONG_ANSWER)
                          └─► Call AI engine (why-wrong.ts)
                               └─► Claude API → diagnosis JSON
                                    └─► UPDATE submissions.ai_analysis
                                         └─► Client polls → renders AI panel
```

---

## Environment variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Judge0
JUDGE0_API_URL=
JUDGE0_API_KEY=

# Anthropic
ANTHROPIC_API_KEY=

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# App
NEXT_PUBLIC_APP_URL=
CRON_SECRET=
```

---

## Deployment topology

```
Vercel                      Railway                   Upstash
┌─────────────────┐         ┌──────────────┐          ┌────────┐
│ Next.js app     │         │ Judge0       │          │ Redis  │
│ (SSR + API      │────────►│ (code runner)│          │ (queue)│
│  routes)        │         └──────────────┘          └────────┘
└────────┬────────┘
         │                  Supabase Cloud
         │                  ┌──────────────────────────┐
         └─────────────────►│ Postgres + Auth +        │
                            │ Realtime + Storage        │
                            └──────────────────────────┘
```
