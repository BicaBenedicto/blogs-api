const { User } = require('../models');

const findByEmail = async (email) => {
  const EmailAlreadyExists = await User.findOne({ where: { email } });
  if (EmailAlreadyExists) return EmailAlreadyExists;
  return false;
};

module.exports = {
  findByEmail,
};
