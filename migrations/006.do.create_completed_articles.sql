CREATE TABLE completed_chapters (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  chapter_id INTEGER REFERENCES chapters(id) ON DELETE CASCADE NOT NULL,
  date_completed TIMESTAMP DEFAULT now() NOT NULL
);