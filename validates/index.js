require('dotenv').config();
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const USER = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const LOGIN = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const CATEGORY = Joi.object({
  name: Joi.string().required(),
});

const POST = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).required(),
});

const TOKEN = async (token) => {
  try {
    await jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (_e) {
    return false;
  }
};

module.exports = {
  USER,
  LOGIN,
  TOKEN,
  CATEGORY,
  POST,
};
