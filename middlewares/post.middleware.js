require('dotenv').config();
const jwt = require('jsonwebtoken');

const { POST, TOKEN } = require('../validates');

const create = async (request, _response, next) => {
  const { body, headers } = request;
  const token = headers.authorization;
  if (!token) return next('tokenEmpty');

  const validateToken = await TOKEN(token);

  if (!validateToken) return next('tokenInvalid');
  const validate = POST.validate(body);
  if (validate.error) return next(validate.error);

  request.user = await jwt.decode(token, process.env.JWT_SECRET).data;

  return next();
};

const get = async (request, _response, next) => {
  const token = request.headers.authorization;
  if (!token) return next('tokenEmpty');

  const validateToken = await TOKEN(token);

  if (!validateToken) return next('tokenInvalid');
  return next();
};

module.exports = {
  create,
  get,
};
