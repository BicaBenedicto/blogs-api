const PostCategory = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.NUMBER,
      foreignKey: true,
    },
    categoryId: { type: DataTypes.NUMBER, foreignKey: true },
  }, { timestamps: false });

  postCategory.associate = (models) => {
    postCategory.belongsTo(models.BlogPost,
      { foreignKey: 'id', as: 'BlogsPosts' });
    postCategory.belongsTo(models.Category,
      { foreignKey: 'id', as: 'Categories' });
  };

  return postCategory;
};

module.exports = PostCategory;
