const express = require('express');
const loginMiddleware = require('../middlewares/login.middleware');
const loginController = require('../controllers/login.controller');

const router = express();

router.post('/', loginMiddleware.acess, loginController.acess);

module.exports = router;
