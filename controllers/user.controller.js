const userServices = require('../services/user.service');
const { User } = require('../models');

const create = async (request, response, next) => {
  const { body: user } = request;
  const emailAlreadyExists = await userServices.findByEmail(user.email);
  if (emailAlreadyExists) return next('emailAlreadyExists');

  const newUser = await User.create(user);
  return response.status(201).json(newUser);
};

module.exports = {
  create,
};
