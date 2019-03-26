CREATE TABLE puzzles (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  title TEXT NOT NULL,
  attempts INTEGER DEFAULT 0 NOT NULL,
  completions INTEGER DEFAULT 0 NOT NULL,
  puzzle_fen_strings TEXT[] NOT NULL,
  solution_fen_strings TEXT[] NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  date_modified TIMESTAMP
);