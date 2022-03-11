const { Category } = require('../models');

const create = async (request, response, _next) => {
  const { name } = request.body;

  const newCategory = await Category.create({ name });

  return response.status(201).json(newCategory);
};

module.exports = {
  create,
};
