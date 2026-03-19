-- ──────────────────────────────────────────────
-- AlgoForge — Row Level Security Policies
-- ──────────────────────────────────────────────

-- enable RLS on all tables
alter table users enable row level security;
alter table problems enable row level security;
alter table submissions enable row level security;
alter table user_topic_progress enable row level security;
alter table groups enable row level security;
alter table group_members enable row level security;
alter table threads enable row level security;
alter table replies enable row level security;
alter table contests enable row level security;
alter table contest_participants enable row level security;


-- ── Users ───────────────────────────────────────

create policy "users can read own profile"
  on users for select
  using (auth.uid() = id);

create policy "users can update own profile"
  on users for update
  using (auth.uid() = id);

create policy "anyone can read basic user info"
  on users for select
  using (true);


-- ── Problems (public read) ──────────────────────

create policy "problems are publicly readable"
  on problems for select
  using (true);


-- ── Submissions (private to owner) ──────────────

create policy "users can read own submissions"
  on submissions for select
  using (auth.uid() = user_id);

create policy "users can create submissions"
  on submissions for insert
  with check (auth.uid() = user_id);


-- ── User Topic Progress ─────────────────────────

create policy "users can read own progress"
  on user_topic_progress for select
  using (auth.uid() = user_id);

create policy "users can upsert own progress"
  on user_topic_progress for insert
  with check (auth.uid() = user_id);

create policy "users can update own progress"
  on user_topic_progress for update
  using (auth.uid() = user_id);


-- ── Groups (public read, member write) ──────────

create policy "groups are publicly readable"
  on groups for select
  using (true);

create policy "authenticated users can create groups"
  on groups for insert
  with check (auth.uid() = owner_id);

create policy "owner can update group"
  on groups for update
  using (auth.uid() = owner_id);

create policy "owner can delete group"
  on groups for delete
  using (auth.uid() = owner_id);


-- ── Group Members ───────────────────────────────

create policy "group members are publicly readable"
  on group_members for select
  using (true);

create policy "users can join groups"
  on group_members for insert
  with check (auth.uid() = user_id);

create policy "users can leave groups"
  on group_members for delete
  using (auth.uid() = user_id);


-- ── Threads ─────────────────────────────────────

create policy "threads are publicly readable"
  on threads for select
  using (true);

create policy "authenticated users can create threads"
  on threads for insert
  with check (auth.uid() = author_id);

create policy "authors can update own threads"
  on threads for update
  using (auth.uid() = author_id);

create policy "authors can delete own threads"
  on threads for delete
  using (auth.uid() = author_id);


-- ── Replies ─────────────────────────────────────

create policy "replies are publicly readable"
  on replies for select
  using (true);

create policy "authenticated users can create replies"
  on replies for insert
  with check (auth.uid() = author_id);

create policy "authors can update own replies"
  on replies for update
  using (auth.uid() = author_id);

create policy "authors can delete own replies"
  on replies for delete
  using (auth.uid() = author_id);


-- ── Contests (public read) ──────────────────────

create policy "contests are publicly readable"
  on contests for select
  using (true);


-- ── Contest Participants ────────────────────────

create policy "participants can view contest entries"
  on contest_participants for select
  using (true);

create policy "users can join contests"
  on contest_participants for insert
  with check (auth.uid() = user_id);
