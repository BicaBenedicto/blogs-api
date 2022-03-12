const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    createdAt: { field: 'published', type: DataTypes.DATE },
    updatedAt: { field: 'updated', type: DataTypes.DATE },
  });

  blogPost.associate = (models) => {
    blogPost.hasOne(models.PostsCategory,
      { foreignKey: 'id', as: 'PostsCategories' });
    blogPost.belongsTo(models.User,
    { foreignKey: 'id', as: 'Users' });
  };

  return blogPost;
};

module.exports = BlogPost;
