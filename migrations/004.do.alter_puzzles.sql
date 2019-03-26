CREATE TYPE difficulties AS ENUM (
  'beginner',
  'intermediate',
  'advanced',
  'master'
);

ALTER TABLE puzzles
  ADD COLUMN
    difficulty difficulties;