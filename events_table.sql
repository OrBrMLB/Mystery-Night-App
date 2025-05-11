create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null,
  location text not null
);

insert into public.events (title, date, location) values
  ('לילה מסתורי 1', '2025-05-10', 'תל אביב'),
  ('לילה מסתורי 2', '2025-06-02', 'ירושלים'),
  ('לילה מסתורי 3', '2025-07-15', 'חיפה')
on conflict do nothing;
