const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  user.associate = (models) => {
    user.hasOne(models.User,
      { foreignKey: 'id', as: 'Users' });
  };

  return user;
};

module.exports = User;
