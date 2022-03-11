require('dotenv').config();
const jwt = require('jsonwebtoken');

const userServices = require('../services/user.service');
const { User } = require('../models');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const create = async (request, response, next) => {
  const { body: user } = request;
  const emailAlreadyExists = await userServices.findByEmail(user.email);
  if (emailAlreadyExists) return next('emailAlreadyExists');

  const newUser = await User.create(user);
  const token = jwt.sign({ data: newUser }, process.env.JWT_SECRET, jwtConfig);
  return response.status(201).json({ ...newUser, token });
};

module.exports = {
  create,
};
