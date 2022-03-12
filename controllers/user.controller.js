require('dotenv').config();
const jwt = require('jsonwebtoken');

const userServices = require('../services/user.service');
const { User, PostsCategory, BlogPost } = require('../models');

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
  return response.status(201).json({ token });
};

const get = async (_request, response, _next) => {
  const getUsers = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
  return response.status(200).json(getUsers);
};

const getById = async (request, response, next) => {
  const { id } = request.params;
  const getUser = await User.findByPk(id);
  if (!getUser) return next('userNotExists');

  return response.status(200).json(getUser);
};

const remove = async (request, response, _next) => {
  const { id } = request.user;
  const posts = await BlogPost.findAll({ attributes: ['id'], where: { userId: id } });

  await Promise
    .all(posts.map(async ({ dataValues }) => PostsCategory.destroy({ where:
      { postId: dataValues.id } })));
  await Promise.all([BlogPost.destroy({ where: { userId: id } }),
      User.destroy({ where: { id } })]);
return response.status(204).end();
};

module.exports = {
  create,
  get,
  getById,
  remove,
};
