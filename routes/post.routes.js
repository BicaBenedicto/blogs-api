const express = require('express');
const postMiddleware = require('../middlewares/post.middleware');
const postController = require('../controllers/post.controller');

const router = express();

router.post('/', postMiddleware.create, postController.create);

module.exports = router;
