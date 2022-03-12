const express = require('express');
const userMiddleware = require('../middlewares/user.middleware');
const userController = require('../controllers/user.controller');

const router = express();

router.post('/', userMiddleware.create, userController.create);
router.get('/:id', userMiddleware.get, userController.getById);
router.get('/', userMiddleware.get, userController.get);
router.delete('/me', userMiddleware.remove, userController.remove);

module.exports = router;
