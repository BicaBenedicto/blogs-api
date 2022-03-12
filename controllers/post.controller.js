const { BlogPost, Category, PostsCategory } = require('../models');

const create = async (request, response, next) => {
  const { body } = request;

  const validationCategories = await Promise
  .all(body.categoryIds.map(async (id) => {
    const categoryExists = await Category.findByPk(id);
    if (!categoryExists) return 'categoryNotFound';
  }));

  if (validationCategories.some((category) => category === 'categoryNotFound')) {
    return next('categoryIdsNotFound');
  }

  const { id } = request.user;

  const post = await BlogPost
    .create({ title: body.title, content: body.content, userId: id });
  const { id: postId, title, content, userId } = post;
  await Promise.all(body.categoryIds
    .map(async (ID) => PostsCategory.create({ postId, categoryId: ID })));

  return response.status(201)
    .json({ id: postId, userId, title, content });
};

module.exports = {
  create,
};
