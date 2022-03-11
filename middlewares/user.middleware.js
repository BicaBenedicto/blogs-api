require('dotenv').config();

const { USER, TOKEN } = require('../validates');

const create = (request, _response, next) => {
  const { body } = request;
  const validate = USER.validate(body);
  if (validate.error) return next(validate.error);

  return next();
};

const get = async (request, _response, next) => {
  const token = request.headers.authorization;
  if (!token) return next('tokenEmpty');

  const validate = await TOKEN(token);
  if (!validate) return next('tokenInvalid');
  return next();
};

module.exports = {
  create,
  get,
};
