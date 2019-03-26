const express = require('express');
const path = require('path');
const ChaptersEditorService = require('./chapters-editor-service');
const { requireAdminAuth} = require('../../middleware/jwt-auth');
const bodyParser = express.json();


const chaptersEditorRouter = express.Router();

chaptersEditorRouter
  .route('/')
  .all(requireAdminAuth)
  .post(bodyParser, (req, res, next) => {
    const { book_id, title } = req.body;
    const newChapter = { book_id, title };

    for (const [key, value] of Object.entries(newChapter)) {
      if (value == null) {
        return res.status(400).json({ error: `Missing '${key}' in request body`});
      }
    }

    ChaptersEditorService.insertChapter(
      req.app.get('db'),
      newChapter
    )
      .then(chapter => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${chapter.id}`))
          .json(ChaptersEditorService.serializeChapter(chapter));
      })
      .catch(next);
  });

chaptersEditorRouter
  .route('/:chapterId')
  .all(requireAdminAuth)
  .all((req, res, next) => {
    const id = req.params.chapterId;
    ChaptersEditorService.getChapterById(
      req.app.get('db'),
      id
    )
      .then(chapter => {
        if (!chapter) {
          return res.status(404).json({ error: `Chapter with id '${id}' not found`});
        }
        req.chapter = chapter;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    return res.json(ChaptersEditorService.serializeChapter(req.chapter));
  })
  .delete((req, res, next) => {
    const id = req.params.chapterId;
    ChaptersEditorService.deleteChapter(
      req.app.get('db'),
      id
    )
      .then(() => {
        return res.sendStatus(204);
      })
      .catch(next);
  })
  .patch(bodyParser, (req, res, next) => {
    //reponds with the updated object, as it is modifying the 'date_modified' field
    const id = req.params.chapterId;
    const { title, content } = req.body;
    const updatedChapter = { title, content, date_modified: new Date() };

    ChaptersEditorService.updateChapter(
      req.app.get('db'),
      id,
      updatedChapter
    )
      .then(() => {
        return res.sendStatus(204);
      })
      .catch(next);
  });

module.exports = chaptersEditorRouter;