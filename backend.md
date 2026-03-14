# Dev B — Your tasks

You're building everything under the hood. The database, the APIs, the code execution pipeline, the AI calls, and the deployment. If a user's code gets run, graded, and explained — that's your work.

Dev A will be building the UI against mocked data the whole time. On Day 5, you hand over your real API endpoints and the integration happens. Until then, you're fully independent.

---

## Day 1 and 2 — Supabase setup and the database

First, sit with Dev A for 30 minutes and write `src/types/api.ts` together. This locks in the shapes that your API responses need to return. Once it's written, you're both free to work independently.

Then create the Supabase project. Go to supabase.com, make a new project called `algoforge`, and grab the project URL and anon key for the `.env.local` file. Turn on GitHub and Google OAuth in the Auth settings.

Now write the database migration. Create one SQL file that defines all the tables: `users`, `problems`, `submissions`, `groups`, `group_members`, `threads`, `replies`, `contests`, and `contest_participants`. The full schema is in the architecture doc. Run it with `npx supabase db push`.

After the schema is live, seed the problems. Write a script at `scripts/seed-problems.ts` that inserts 75+ problems (the Blind 75 list is your base). Each problem needs: a slug, title, difficulty, topic tags, company tags, description, test cases as JSON, and three hint strings. This is tedious but it's a one-time job and it's critical — without problems the whole app is useless.

Set up Row Level Security on every table. The rule of thumb: users can only read and write their own data. Problems are public read. Submissions are private to the user who made them. Groups are readable by all, writable only by members.

By end of Day 2 you should have: a live Supabase project, all tables created, 75+ problems seeded, RLS active.

---

## Day 3 — API routes and the submission pipeline

This is the most important day of your week. Get the code execution pipeline working.

Start with the simple routes first. Build `GET /api/problems` with filter support (topic, company, difficulty, solved status) and pagination. Build `GET /api/problems/[slug]` to return a single problem with full detail.

Then set up Judge0. For the MVP, use the RapidAPI hosted version — sign up, get a key, and put it in `.env.local`. This saves you from self-hosting during the build week.

Set up BullMQ with Upstash Redis. Create a single queue called `judge-queue` with 4 concurrent workers, 3 retry attempts, and exponential backoff. The dead letter queue should be called `judge-failed`.

Now build the submission flow. `POST /api/submissions` takes `{ problemId, code, language }`, inserts a row in `submissions` with status `PENDING`, enqueues a BullMQ job, and returns the `submissionId`. That's it — it returns immediately, no waiting.

The BullMQ worker in `workers/judge.worker.ts` does the actual work: it calls Judge0 with the code and test cases, waits for a result, then updates the submission row in the database. If the result is `WRONG_ANSWER`, it makes one more call — to the Claude API — and stores the AI analysis in the `submissions.ai_analysis` column as JSON.

Build the AI engine in `src/lib/ai/`. The most important file is `why-wrong.ts`. It takes the problem description, the expected time complexity, and the user's code, and returns an `AIAnalysis` object (typed in `api.ts`). The prompt you send to Claude needs to ask for: the conceptual model the user was applying, the correct model needed to meet the complexity constraint, a minimal code scaffold showing the right approach (not the full solution), and one specific prerequisite problem. Make sure you're prompting Claude to avoid just echoing the error — the whole point is a conceptual diagnosis.

Also build `hint-generator.ts` (three progressive hints per problem), `explain.ts` (full concept explanation), and `recommender.ts` (looks at which topics have the lowest solve rate for the user and returns one recommended problem).

Build `GET /api/submissions/[id]` for polling — just return the current status and AI analysis if it exists.

By end of Day 3 you should have: problem routes working, code execution pipeline running end-to-end, AI analysis being stored on wrong submissions.

---

## Day 4 — Community routes and Realtime

Build all the community API routes:

- `GET /api/threads` — list threads, filter by tag, paginate
- `POST /api/threads` — create a thread
- `GET /api/threads/[id]/replies` — get replies for a thread
- `POST /api/threads/[id]/replies` — post a reply
- `POST /api/threads/[id]/upvote` — upvote a thread
- `GET /api/groups` — list groups
- `POST /api/groups` — create a group
- `POST /api/groups/[id]/join` — join a group
- `DELETE /api/groups/[id]/leave` — leave a group

Then set up two Supabase Realtime channels. The first is `group:{id}:feed` — it broadcasts whenever someone in a group solves a problem or posts. The second is `contest:{id}:leaderboard` — it broadcasts whenever anyone submits a correct answer during a live contest. Dev A subscribes to these from the browser using the Supabase client. You just need to make sure they're publishing the right data at the right moments.

Build the contest engine too. You need `POST /api/contests/[id]/submit` which handles a submission during a live contest and applies the time penalty (10 minutes per wrong attempt). Build `GET /api/contests/[id]/leaderboard` which returns participants sorted by score descending, then time ascending. When a contest ends, trigger `lib/ai/post-mortem.ts` for each participant — this calls Claude with their full contest performance and returns a 3-day recovery study plan.

---

## Day 5 — Dashboard data, user progress, and cron jobs

Build `GET /api/dashboard`. This is a single endpoint that returns everything Dev A needs to render the dashboard: streak, rating, topic progress bars (solved vs total per topic), heatmap data (daily solve counts for the past 52 weeks), AI recommendation, and the last 10 items from the user's group feed. Query it all in one request so the dashboard loads fast.

Build `GET /api/users/[id]/progress` for the per-topic breakdown and heatmap data separately if needed for the progress page.

Set up three cron jobs using Vercel Cron in `vercel.json`:

- **Streak reset** — runs at midnight IST every day. Checks `last_active_at` for every user. If it's been more than 24 hours, set their streak to 0.
- **Weekly contest creation** — runs at 6pm IST every Friday. Seeds a new contest with 5 problems picked from the problem bank.
- **Rating recalculation** — runs after each contest ends. Updates every participant's rating using the score delta from the contest.

Set up Redis rate limiting middleware. Apply it to two routes: code submission (10 requests per minute per user) and AI requests (20 per minute per user). Use Upstash's built-in rate limiting library — it's one function call.

Set up Supabase Storage for user avatars. One bucket called `avatars`, public read, authenticated write only.

---

## Day 6 and 7 — Integration and deployment

This is where you and Dev A come together. Share the real API base URL and go through every endpoint together to confirm the response shapes match what's in `api.ts`. Fix anything that doesn't line up.

Deploy the Next.js app to Vercel. Connect your GitHub repo, add all the environment variables in the Vercel dashboard, and do a production deploy. Make sure the cron jobs are showing up correctly in Vercel.

Set up a basic GitHub Actions CI pipeline that runs on every push: type check with `tsc --noEmit`, lint with `eslint`, and run unit tests for the judge worker and contest scoring logic.

Do a final database audit. Add indexes on the columns you're filtering by most: `problems.difficulty`, `problems.topic`, `submissions.user_id`, `submissions.problem_id`, `threads.tag`. Check all RLS policies one more time with a test user account that isn't your admin account.

Write a `README.md` with local dev setup instructions so either of you can get the project running from scratch in under 10 minutes.

---

## What you are not responsible for

You don't build any UI components, pages, or styles. You don't touch Monaco, Zustand, or React Query. If something looks broken on screen, that's Dev A's problem. Your job is to make every API endpoint return the correct data in the shape defined by `api.ts`, with no crashes.
