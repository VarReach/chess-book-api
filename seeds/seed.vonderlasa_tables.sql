BEGIN;

TRUNCATE
  completed_chapters,
  users,
  books,
  chapters
  RESTART IDENTITY CASCADE;

INSERT INTO users (user_name, password, perms)
VALUES
  ('dunder', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne', true),
  ('demo2', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne', null);

INSERT INTO books (title, blurb, chapter_order, published, default_book)
VALUES
  ('Fundamentals', 'All about the Fundamentals', ARRAY[2,1], true, true),
  ('Basics','Nothing like the basics', '{}', true, null),
  ('Null Test', 'Its null. What do you expect?','{}', null, null);

INSERT INTO chapters (book_id, title, content)
VALUES
  (1, 'Testing',
    '{
      "blocks": [
        {
          "key": "a983p",
          "text": "Hey there!",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "eoff2",
          "text": "",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "clh2f",
          "text": "",
          "type": "atomic",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {
            "type": "chessboard",
            "position": "start"
          }
        },
        {
          "key": "dh25o",
          "text": "",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        }
      ],
      "entityMap": {}
    }'
  ),
  (1, 'This', null),
  (1, 'Unpublished', null),
  (1, 'Unpublished 2', null);

INSERT INTO completed_chapters (ids, user_id, chapter_id)
VALUES
  ('1-1', 1, 1),
  ('1-2', 1, 2);

COMMIT;
