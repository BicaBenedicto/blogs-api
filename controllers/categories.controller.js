const { Category } = require('../models');

const create = async (request, response, _next) => {
  const { name } = request.body;

  const newCategory = await Category.create({ name });

  return response.status(201).json(newCategory);
};

const get = async (_request, response, _next) => {
  const getCategories = await Category.findAll({ attributes: ['id', 'name'] });

  return response.status(200).json(getCategories);
};

module.exports = {
  create,
  get,
};
