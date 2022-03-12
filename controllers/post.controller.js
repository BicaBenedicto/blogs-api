const { BlogPost, Category, PostsCategory } = require('../models');
const PostService = require('../services/post.service');

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

const get = async (_request, response, _next) => {
  const posts = await BlogPost
    .findAll({ attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'] });
  const postsOutput = await PostService.get(posts);

  return response.status(200).json(postsOutput);
};

module.exports = {
  create,
  get,
};
