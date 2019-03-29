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
  ('Basics','Nothing like the basics', ARRAY[3,4], true, null),
  ('Null Test', 'Its null. What do you expect?','{}', true, null),
  ('Null Test', 'Its null. What do you expect?','{}', true, null),
  ('Null Test', 'Its null. What do you expect?','{}', true, null),
  ('Null Test', 'Its null. What do you expect?','{}', null, null);

INSERT INTO chapters (book_id, title, content)
VALUES
  (1, 'Testing',
    '{
      "blocks": [
        {
          "key": "a983p",
          "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac mauris fringilla felis viverra suscipit ac sit amet nibh. Donec euismod nibh in ante malesuada, sit amet aliquet magna porttitor. Aenean laoreet sit amet ipsum a lacinia. Curabitur ullamcorper sed ante et fermentum. Praesent est mauris, faucibus in volutpat at, suscipit vitae magna. Nam tempus urna in lorem venenatis consectetur et at lorem. Ut mi ex, malesuada non mi et, iaculis tristique ipsum. Sed placerat porttitor condimentum. Curabitur interdum metus quis pulvinar auctor. Nulla id posuere ante.",
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
            "position": "start",
            "caption": "This is what a standard chessboard looks like with the pieces set up correctly.",
            "source": "V. Topalov vs. K. Sasikiran."
          }
        },
        {
          "key": "dh25o",
          "text": "Nullam hendrerit tortor diam, sed eleifend ligula fringilla a. Nulla ante lectus, sollicitudin pretium nibh id, interdum suscipit velit. Proin nec interdum nibh. Vivamus eu ante euismod erat ornare gravida. Vivamus a tellus nec leo commodo faucibus et nec ligula. Curabitur dolor dui, accumsan a vehicula ac, aliquam quis massa. Fusce posuere tincidunt dictum. Phasellus sem nisl, congue ut est id, euismod feugiat neque. Pellentesque a porttitor tortor. Maecenas fringilla porta sollicitudin. Maecenas semper sodales ante, at condimentum leo vulputate ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam eget mollis eros.",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [
            {
              "offset": 7,
              "length": 9,
              "style": "BOLD"
            }
          ],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "1ddpg",
          "text": "Nam et massa in est dictum accumsan et non dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar mollis massa id cursus. Nunc eget est a urna malesuada accumsan. Ut pellentesque in erat a ultrices. Nulla sem lacus, bibendum sit amet enim vitae, ultrices placerat felis. Pellentesque scelerisque facilisis imperdiet. Sed aliquam nibh et sodales varius. Quisque volutpat nisi libero, eu vulputate ligula lobortis eget. Sed congue odio non lectus dignissim congue. Curabitur mauris justo, ullamcorper in pellentesque ac, blandit ac nisi.",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [
            {
              "offset": 7,
              "length": 5,
              "style": "ITALIC"
            }
          ],
          "entityRanges": [
            {
              "offset": 7,
              "length": 5,
              "key": 0
            }
          ],
          "data": {}
        },
        {
          "key": "d0eo",
          "text": "a list!",
          "type": "unordered-list-item",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "sfvl",
          "text": "with more than one element!",
          "type": "unordered-list-item",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "dfgvv",
          "text": "an empty numbered list?",
          "type": "ordered-list-item",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "clqpg",
          "text": "",
          "type": "ordered-list-item",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "7nvma",
          "text": "a header?",
          "type": "header-two",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "16nkt",
          "text": "Suspendisse placerat egestas orci eu molestie. Etiam vulputate efficitur dui, in congue nisl convallis at. Ut ac ligula quis mauris auctor gravida.",
          "type": "blockquote",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "fb6of",
          "text": "Vestibulum vel dolor a lectus ultrices fringilla vel id mauris. Donec porttitor et ex ut imperdiet. Pellentesque vitae imperdiet enim. Suspendisse in sagittis leo. Nam porttitor, est at malesuada sagittis, sapien mauris pellentesque risus, tincidunt venenatis odio lacus in ex. Proin eget tortor tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur porttitor facilisis leo id aliquam. Sed at nisl pellentesque, egestas nunc sit amet, posuere velit. Donec eget mattis dui. Mauris consectetur velit vel aliquam euismod.",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        }
      ],
      "entityMap": {
        "0": {
          "type": "LINK",
          "mutability": "MUTABLE",
          "data": {
            "url": "http://www.google.com"
          }
        }
      }
    }'
  ),
  (1, 'This', null),
  (2, 'Unpublished', ('{
  "blocks": [
    {
      "key": "a983p",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac mauris fringilla felis viverra suscipit ac sit amet nibh. Donec euismod nibh in ante malesuada, sit amet aliquet magna porttitor. Aenean laoreet sit amet ipsum a lacinia. Curabitur ullamcorper sed ante et fermentum. Praesent est mauris, faucibus in volutpat at, suscipit vitae magna. Nam tempus urna in lorem venenatis consectetur et at lorem. Ut mi ex, malesuada non mi et, iaculis tristique ipsum. Sed placerat porttitor condimentum. Curabitur interdum metus quis pulvinar auctor. Nulla id posuere ante.",
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
      "key": "dh25o",
      "text": "Nullam hendrerit tortor diam, sed eleifend ligula fringilla a. Nulla ante lectus, sollicitudin pretium nibh id, interdum suscipit velit. Proin nec interdum nibh. Vivamus eu ante euismod erat ornare gravida. Vivamus a tellus nec leo commodo faucibus et nec ligula. Curabitur dolor dui, accumsan a vehicula ac, aliquam quis massa. Fusce posuere tincidunt dictum. Phasellus sem nisl, congue ut est id, euismod feugiat neque. Pellentesque a porttitor tortor. Maecenas fringilla porta sollicitudin. Maecenas semper sodales ante, at condimentum leo vulputate ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam eget mollis eros.",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [
        {
          "offset": 7,
          "length": 9,
          "style": "BOLD"
        }
      ],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "7nvma",
      "text": "a header?",
      "type": "header-two",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
	{
	  "key": "a983p",
	  "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac mauris fringilla felis viverra suscipit ac sit amet nibh. Donec euismod nibh in ante malesuada, sit amet aliquet magna porttitor. Aenean laoreet sit amet ipsum a lacinia. Curabitur ullamcorper sed ante et fermentum. Praesent est mauris, faucibus in volutpat at, suscipit vitae magna. Nam tempus urna in lorem venenatis consectetur et at lorem. Ut mi ex, malesuada non mi et, iaculis tristique ipsum. Sed placerat porttitor condimentum. Curabitur interdum metus quis pulvinar auctor. Nulla id posuere ante.",
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
        "position": "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
        "caption": "It does support custom positions.",
        "source": "Chess v1.0."
      }
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
		"position": "start",
		"caption": "This is what a standard chessboard looks like with the pieces set up correctly.",
		"source": "V. Topalov vs. K. Sasikiran."
	  }
	}
  ],
  "entityMap": {
    "0": {
      "type": "LINK",
      "mutability": "MUTABLE",
      "data": {
        "url": "http://www.google.com"
      }
    }
  }
}')),
  (2, 'Unpublished 2', null);

INSERT INTO completed_chapters (ids, user_id, chapter_id)
VALUES
  ('1-1', 1, 1),
  ('1-2', 1, 2);

COMMIT;
