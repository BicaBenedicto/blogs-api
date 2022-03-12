const { User, PostsCategory, Category } = require('../models');

const get = async (array) => {
  const posts = await Promise.all(array.map(async ({ dataValues }) => {
    const [user, categoryIds] = await Promise.all([User.findByPk(dataValues.userId),
      PostsCategory
      .findAll({ attributes: ['postId', 'categoryId'], where: { postId: dataValues.id } })]);

    const categories = await Promise.all(categoryIds
      .map(async ({ dataValues: data }) => Category.findByPk(data.categoryId)));

    return {
    ...dataValues,
    user,
    categories,
    };
  }));
  return posts;
};

module.exports = {
  get,
};
