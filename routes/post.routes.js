const express = require('express');
const postMiddleware = require('../middlewares/post.middleware');
const postController = require('../controllers/post.controller');

const router = express();

router.post('/', postMiddleware.create, postController.create);
router.get('/search', postMiddleware.get, postController.findBySearch);
router.get('/:id', postMiddleware.get, postController.getById);
router.get('/', postMiddleware.get, postController.get);
router.put('/:id', postMiddleware.update, postController.update);
router.delete('/:id', postMiddleware.remove, postController.remove);

module.exports = router;
