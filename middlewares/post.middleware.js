require('dotenv').config();
const jwt = require('jsonwebtoken');

const { POST, TOKEN, POST_PUT } = require('../validates');
const { BlogPost } = require('../models');

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

const update = async (request, _response, next) => {
  const { body, params, headers } = request;
  const { id } = params;
  
  const token = headers.authorization;
  if (!token) return next('tokenEmpty');
  const validateToken = await TOKEN(token);
  if (!validateToken) return next('tokenInvalid');
  
  const user = jwt.decode(token, process.env.JWT_SECRET);
  const post = await BlogPost.findByPk(id);

  if (post.userId !== user.data.id) return next('UnauthorizedUser');

  if (POST_PUT.validate(body)) return next(POST_PUT.validate(body).error);
  return next();
};

module.exports = {
  create,
  get,
  update,
};
