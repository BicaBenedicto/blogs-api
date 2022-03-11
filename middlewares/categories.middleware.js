require('dotenv').config();

const { CATEGORY, TOKEN } = require('../validates');

const create = async (request, _response, next) => {
  const { body, headers } = request;
  const token = headers.authorization;
  if (!token) return next('tokenEmpty');

  const validateToken = await TOKEN(token);

  if (!validateToken) return next('tokenInvalid');

  const validate = CATEGORY.validate(body);
  if (validate.error) return next(validate.error);

  return next();
};

module.exports = {
  create,
};
