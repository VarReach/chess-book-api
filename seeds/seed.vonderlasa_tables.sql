BEGIN;

TRUNCATE
  completed_chapters,
  users,
  books,
  chapters
  RESTART IDENTITY CASCADE;

INSERT INTO users (user_name, password, perms)
VALUES
  ('Carlsen', '$2a$10$6TKzv7WsHDBHM8NPNhyTpOu4WNglnz05Ldf2J95F7bYeCetQPKV8W', true),
  ('Whatschess', '$2a$10$WSKfwYQ/V5Wwzwq8QhicHOKyzU1Wl37HAWiI8.tzBhvt8TnVhTTJe', null);

INSERT INTO books (title, blurb, chapter_order, published, default_book)
VALUES
  ('Fundamentals', 'All about the Fundamentals', ARRAY[2,1], true, true),
  ('Basics','Nothing like the basics', ARRAY[3], true, null);

INSERT INTO chapters (book_id, title, content)
VALUES
  (1, 'The true basics', '{
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
  (1, 'What an empty board looks like', '{
  "blocks": [
    {
      "key": "399jt",
      "text": " Vestibulum rutrum pretium dui, nec viverra eros pulvinar ut. Nulla sed  diam vitae erat dignissim consectetur quis ut massa. Fusce varius, metus  ac porta pharetra, turpis lectus facilisis neque, ut ultrices urna  neque eu nisi. Integer purus diam, auctor vel lobortis tincidunt,  scelerisque eget nulla. Phasellus pharetra ornare mauris ut auctor.  Pellentesque nunc ante, gravida vel pretium id, condimentum a eros.  Fusce maximus vestibulum luctus. Aenean eget dolor lectus. ",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "37ol1",
      "text": "Fusce imperdiet, urna non pretium ornare, lectus dui pellentesque elit,  eu fringilla mauris neque sit amet ipsum. Phasellus interdum lacus at  risus tempus, vitae dictum eros vestibulum. Pellentesque id odio id  purus luctus pulvinar sit amet vel diam. Curabitur fermentum tincidunt  libero id molestie. Mauris sit amet lacus egestas, aliquet augue non,  elementum tellus. Donec in diam vel dolor iaculis posuere vel non  lectus. Nullam vel turpis varius, fermentum elit at, iaculis velit. ",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "bsccb",
      "text": "",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "type": "chessboard",
        "position": "empty",
        "caption": "This is an empty board.",
        "source": "No source."
      }
    },
    {
      "key": "57kb7",
      "text": " Maecenas non magna imperdiet, condimentum quam sit amet, tincidunt  tellus. Aliquam vitae rutrum arcu. Sed accumsan ligula in quam luctus  eleifend. Mauris purus nisl, mattis a libero nec, elementum ornare  mauris. Cras aliquet tempus risus, et condimentum dui mollis et.  Vestibulum non porta nibh. Maecenas consectetur sodales nunc vitae  euismod.  ",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    }
  ],
  "entityMap": {}
  }'),
  (2, '10 things you are doing wrong', '{
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
}');

COMMIT;
