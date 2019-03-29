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
