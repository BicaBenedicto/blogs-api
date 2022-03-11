const Category = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
  }, { timestamps: false });

  category.associate = (models) => {
    category.hasOne(models.PostCategory,
      { foreignKey: 'id', as: 'PostsCategories' });
  };

  return category;
};

module.exports = Category;
