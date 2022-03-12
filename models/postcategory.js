const PostsCategory = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostsCategory', {
    postId: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    categoryId: { type: DataTypes.NUMBER, primaryKey: true },
  }, { timestamps: false });

  return postCategory;
};

module.exports = PostsCategory;
