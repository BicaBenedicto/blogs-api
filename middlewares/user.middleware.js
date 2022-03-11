const { USER } = require('../validates');

const create = (request, _response, next) => {
  const { body } = request;
  const validate = USER.validate(body);
  if (validate.error) return next(validate.error);

  return next();
};

module.exports = {
  create,
};
