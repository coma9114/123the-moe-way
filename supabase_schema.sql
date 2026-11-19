-- LEXORA Supabase / PostgreSQL schema (Phase 2)
create extension if not exists pgcrypto;

create table public.words (
  id uuid primary key default gen_random_uuid(),
  lemma text not null unique,
  part_of_speech text,
  pronunciation text,
  definition_en text,
  meaning_zh text,
  example_en text,
  example_zh text,
  collocations text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table public.word_images (
  id uuid primary key default gen_random_uuid(),
  word_id uuid not null references public.words(id) on delete cascade,
  image_url text not null,
  source_name text,
  source_url text,
  license text,
  attribution text,
  created_at timestamptz not null default now()
);

create table public.user_word_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  word_id uuid not null references public.words(id) on delete cascade,
  repetitions integer not null default 0,
  lapses integer not null default 0,
  last_reviewed_at timestamptz,
  due_at timestamptz,
  stability real,
  difficulty real,
  unique(user_id, word_id)
);

alter table public.user_word_progress enable row level security;
create policy "Users can read own progress" on public.user_word_progress
  for select using (auth.uid() = user_id);
create policy "Users can insert own progress" on public.user_word_progress
  for insert with check (auth.uid() = user_id);
create policy "Users can update own progress" on public.user_word_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Public vocabulary content is readable by everyone.
alter table public.words enable row level security;
create policy "Words are readable" on public.words for select using (true);
alter table public.word_images enable row level security;
create policy "Word images are readable" on public.word_images for select using (true);
