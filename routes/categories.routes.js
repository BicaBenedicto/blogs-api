const express = require('express');
const categoriesMiddleware = require('../middlewares/categories.middleware');
const categoriesController = require('../controllers/categories.controller');

const router = express();

router.post('/', categoriesMiddleware.create, categoriesController.create);

module.exports = router;
