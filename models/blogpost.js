const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: { primaryKey: true, type: DataTypes.INTEGER },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });

  blogPost.associate = (models) => {
    blogPost.hasOne(models.PostCategory,
      { foreignKey: 'id', as: 'PostsCategories' });
      blogPost.belongsTo(models.User,
      { foreignKey: 'id', as: 'Users' });
  };

  return blogPost;
};

module.exports = BlogPost;
