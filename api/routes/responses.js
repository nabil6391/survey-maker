const controller = require('../controllers/responses');
const router = require('express').Router();

//CRUD
router
  .get('/', controller.getAll)
  .get('/:id', controller.getOne)
  .post('/', controller.createAll)
  .put('/:id', controller.updateOne)
  .delete('/:id', controller.deleteOne);

module.exports = router;
