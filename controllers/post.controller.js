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

const getById = async (request, response, next) => {
  const { id } = request.params;
  const posts = await BlogPost
    .findAll({
      attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
      where: { id },
    });
  if (posts.length === 0) return next('PostNotExists');
  const [postsOutput] = await PostService.get(posts);

  return response.status(200).json(postsOutput);
};

const update = async (request, response, next) => {
  const { body } = request;
  const { id } = request.params;
  const posts = await BlogPost
    .findAll({
      attributes: ['title', 'content', 'userId'],
      where: { id },
    });
  if (posts.length === 0) return next('PostNotExists');

  const newPost = { userId: posts[0].dataValues.userId,
    title: body.title,
    content: body.content };

  const [postsOutput] = await Promise.all([PostService.update(id),
    BlogPost.update({ title: body.title, content: body.content }, {
      where: { id },
    })]);

  newPost.categories = postsOutput;

  return response.status(200).json(newPost);
};

const remove = async (request, response, _next) => {
  const { id } = request.params;
  await Promise
    .all([PostsCategory.destroy({ where: { postId: id } }), BlogPost.destroy({ where: { id } })]);
  return response.status(204).end();
};

module.exports = {
  create,
  get,
  getById,
  update,
  remove,
};
