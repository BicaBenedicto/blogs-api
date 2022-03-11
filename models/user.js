const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: DataTypes.NUMBER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  user.associate = (models) => {
    user.hasOne(models.User,
      { foreignKey: 'id', as: 'Users' });
  };

  return user;
};

module.exports = User;
