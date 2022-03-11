require('dotenv').config();
const jwt = require('jsonwebtoken');

const { USER } = require('../validates');

const create = (request, _response, next) => {
  const { body } = request;
  const validate = USER.validate(body);
  if (validate.error) return next(validate.error);

  return next();
};

const get = async (request, _response, next) => {
  const token = request.headers.authorization;
  if (!token) return next('tokenEmpty');

  try {
    await jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (_e) {
    return next('tokenInvalid');
  }
};

module.exports = {
  create,
  get,
};
