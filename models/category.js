const Category = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    id: DataTypes.NUMBER,
    name: DataTypes.STRING,
  });

  category.associate = (models) => {
    category.hasOne(models.PostCategory,
      { foreignKey: 'id', as: 'PostsCategories' });
  };

  return category;
};

module.exports = Category;
