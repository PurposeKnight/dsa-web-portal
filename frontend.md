# Dev A — Your tasks

You're building everything the user sees and touches. Think of it this way: if it's on screen, it's yours.

You don't need to wait for Dev B to start. From Day 1, use fake data (hardcoded JSON) wherever the backend isn't ready. Swap in the real API on Day 5 when Dev B is done.

---

## Day 1 and 2 — Set up the project and build the base components

Run `npx create-next-app@latest algoforge --typescript --tailwind --app --src-dir` to create the project. Then sit down with Dev B for 30 minutes and write the `src/types/api.ts` file together. This is the contract between you two — it defines what shape the data will be in. Once that's done, you're both unblocked.

After that, build the reusable components that every page will use: buttons, cards, badges, avatars, modals, progress bars, the activity heatmap grid. These go in `src/components/ui/`. None of this needs real data — just build them with props.

Also build the login and register pages. Supabase handles the actual auth logic, so you just need the UI forms wired up to call `supabase.auth.signInWithOAuth()` and `supabase.auth.signUp()`.

By end of Day 2 you should have: a running app, a full set of base components, and working login/register.

---

## Day 3 — Build the Dashboard and Problem List pages

The Dashboard is at `/dashboard`. It shows four stat cards (problems solved, streak, contest rating, weekly goal), topic mastery bars with percentages, a 52×7 activity heatmap, an AI recommendation card, a group live feed, and a contest widget. All of this runs off mocked data for now — just hardcode realistic values.

The Problem List is at `/problems`. It needs a filter bar at the top (filter by topic, company, difficulty, and whether you've solved it), and a list of problem rows below. Each row shows a coloured difficulty dot, the problem title, company tag, and a checkmark if solved. Keep the filtering client-side against your hardcoded data.

---

## Day 4 — Build the Problem Editor page

This is the most important page in the app. It lives at `/problems/[slug]`.

On the left: integrate the Monaco editor using `@monaco-editor/react`. Add a language switcher dropdown (Python, JavaScript, TypeScript, Java, C++). Add a Run button and a Submit button. Below the editor, show a test results panel — pass/fail for each test case, expected vs actual output, and runtime.

On the right: the AI panel. This is the feature that makes AlgoForge different from every other platform. Build it with three tabs:

**Why Wrong tab** — this is what shows after a wrong submission. It has three sections. First, a red box that says what conceptual mistake the user made (not just "wrong answer" — the actual mental model mismatch). Second, a purple box that explains the mental model they were missing and shows a small code scaffold. Third, a green box that recommends one specific prerequisite problem to solve first. All of this comes from the `AIAnalysis` type in `api.ts` — just mock that object for now.

**Hint tab** — three hint cards that reveal progressively. Click to reveal hint 1, click again for hint 2, then hint 3.

**Explain tab** — a clean text explanation of the concept, with time and space complexity shown at the bottom.

For the submission flow: when the user hits Submit, call `POST /api/submissions` (mocked), poll `GET /api/submissions/:id` every 2 seconds, then render the result. If it's a wrong answer, show the AI panel automatically.

---

## Day 5 — Build the Community and Contest pages

Community is at `/community`. Left side: a list of discussion threads. Each thread card shows a tag (Help Needed / Solution Share / Challenge / Discussion), the thread title, author, upvote count, and reply count. Add a filter bar at the top to filter by tag. Add a "New Thread" button that opens a modal with a title field, markdown body, and tag selector. Right side: a list of study group cards. Each shows the group name, member count, current topic, a live dot if people are active, and a Join/Leave button.

Contest is at `/contest`. At the top: a hero section showing the contest name, your current rank, your score, problems solved, and a live countdown timer. Below that on the left: a list of the 5 contest problems, each showing its ID letter, title, difficulty, points, and whether it's solved/attempted/not touched. On the right: a live leaderboard showing rank, username, score, and problems solved. At the bottom: an AI post-mortem card that's locked with a message saying it unlocks after the contest ends.

---

## Day 6 and 7 — Plug in the real backend and polish

On Day 5, Dev B will tell you the real API base URL and confirm the response shapes match `api.ts`. Go through every page and swap the hardcoded mock data for real `fetch()` calls.

Then do a polish pass. Check every page on a narrow screen. Add skeleton loading states everywhere data is fetched. Add empty states for things like "no problems solved yet" and "not in any groups". Add toast notifications when something fails. Make sure hitting refresh doesn't lose the auth session.

---

## What you are not responsible for

You don't touch the database, API routes, Judge0, BullMQ, cron jobs, Redis, or deployment. If something isn't working in the backend, that's Dev B's problem. Your job is to make the UI complete, correct, and solid against the agreed types in `api.ts`.
