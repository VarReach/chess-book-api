# Chess-Book API

Chess-Book is a web application designed to hold the eventual chessbook(s) my Father intends to write. 
Demo: https://varreach-chess-book-demo.now.sh/
Client Repo: https://github.com/VarReach/chess-book-client

## API and Example Responses

### Public Endpoints

```
.get .../api/books
```

Grabs all info on published books.

###### Example response:

```javascript
[
  {
    "id": 1,
    "title": "Dummy Title",
    "blurb": "Placeholder",
    "default_book": null,
    "chapter_order": [],
    "chapters": []
  },
  {
    "id": 2,
    "title": "Basics",
    "blurb": "Nothing like the basics",
    "default_book": null,
    "chapter_order": [
        2,
        1
      ],
    "chapters": [
        {
          "id": 2,
          "title": "Dummy Chapter Title"
        },
        {
          "id": 1,
          "title": "Chapter 1"
        }
      ]
  },
]
```
---
```
.get .../api/books/:bookId/chapter/:chapterIndex
```

Grabs information on a chapter inside a book. Based on the chapter_order array inside the book object.

###### Example response:

```javascript
{
  "id": 2,
  "title": "Dummy Chapter Title",
  "content": {
    "blocks": [
      {
        ...
      }
    ],
    ...
  },
  "date_published": null,
  "book_title": "Basics",
  "last_chapter_available": 2
}
```
---

#### Auth Router

```
.post .../login
```
Takes a user_name and password in the request body and checks it against the database, returns with a JWT.

```
.post /refresh
```
Requires a valid, non-expired auth token. Reponds with another token. Intended to refresh the timer on JWT that are about to expire.

---

### Protected Endpoints:

```
.get /api/users
```
Get information about a user. Used to grab what chapters a user has completed. 

###### Example response:
```javascript
{
  "id": 1,
  "user_name": "username",
  "completed_chapters": [
    {
      "id": 1,
      "date_completed": ...
    },
    ...
  ]
}
```

```
.post /api/users/completed_chapters/:chapterId
```

Used to post completed chapter information to the database for a user. Grabs the user id automatically from the required authorization bearer token.

---

```
.get /api/editor/books
```


###### Example response:
```javascript
[
  {
    "id": 1,
    "title": "Fundamentals",
    "blurb": "All about the Fundamentals",
    "chapter_order": [
      ...
    ],
    "default_book": true,
    "published": true,
    "date_created": ...
    "date_published": ...
    "date_modified": ...
  },
  ...
]
```
Grabs all available information on all books.

`.post .../api/editor/books`

Used to create a new book in the database. Requires a title and verifies title attributes such as length.

##### Example response:

```javascript
{
  "id": 7,
  "title": "testing",
  "blurb": "I like to test...",
  "chapter_order": [1,2 ...],
  "default_book": null,
  "published": null,
  "date_created": ...
  "date_published": null,
  "date_modified": null
}
```

`.get .../api/editor/books/:bookId/`

Grabs specific information on a book in the database. See post route for example data.

`.patch .../api/editor/books/:bookId`

Requires any of: a new title, a new chapter order, a new blurb or new publishment status. Responds with the updated chapter. See post route for example data.

`.delete .../api/editor/books/:bookId`

Deletes the designated book.

---
	
`.get .../api/editor/chapters`

Grabs all available information on all books

###### Example response:

```javascript
[
  {
    "id": 1,
    "title": "Fundamentals",
    "blurb": "All about the Fundamentals",
    "chapter_order": [
      ...
    ],
    "default_book": true,
    "published": true,
    "date_created": ...
    "date_published": ...
    "date_modified": ...
  },
  ...
]
```

`.post .../api/editor/chapters`

Used to create a new chapter in the database. Requires an associated book_id and title. Checks to make sure the book exists.

```javascript
{
  "id": 6,
  "book_id": 1,
  "title": "testing",
  "content": null,
  "date_created": "2019-03-30T01:04:43.116Z",
  "date_published": null,
  "date_modified": null
}
```

`.get .../api/editor/chapters/:chapterId`

Grabs specific information on a chapter in the database. 

`.patch .../api/editor/chapters/:chapterId`

Requires any of: a new title, new content. Responds with no content.

`.delete .../api/editor/chapters/:chapterId`

Deletes the designated chapter.

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
