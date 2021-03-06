const controller = require('../controllers/surveys');
const router = require('express').Router();

//CRUD
router
  .get('/', controller.getAll)
  .get('/:id', controller.getOne)
  .get('/slug/:slug', controller.getBySlug)
  .get('/user/:userId', controller.getByUserId)
  .post('/', controller.createOne)
  .put('/:id', controller.updateOne)
  .delete('/:id', controller.deleteOne);

module.exports = router;


