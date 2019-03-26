CREATE TABLE chapters (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content JSON,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  date_published TIMESTAMP,
  date_modified TIMESTAMP
);