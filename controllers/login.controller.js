require('dotenv').config();
const jwt = require('jsonwebtoken');

const userServices = require('../services/user.service');
const { User } = require('../models');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const acess = async (request, response, next) => {
  const { body: user } = request;
  const emailAlreadyExists = await userServices.findByEmail(user.email);
  if (!emailAlreadyExists) return next('emailNotFound');

  const newUser = await User.findOne({ where: { email: user.email, password: user.password } });
  if (!newUser) return next('loginInvalid');

  const token = jwt.sign({ data: newUser }, process.env.JWT_SECRET, jwtConfig);
  return response.status(200).json({ token });
};

module.exports = {
  acess,
};
