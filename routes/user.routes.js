const express = require('express');
const userMiddleware = require('../middlewares/user.middleware');
const userController = require('../controllers/user.controller');

const router = express();

router.post('/', userMiddleware.create, userController.create);

module.exports = router;
