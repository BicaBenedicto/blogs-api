const TYPES = {
  emailAlreadyExists: {
    code: 409,
    message: 'User already registered',
  },
  'displayNamestring.min': {
    code: 400,
    message: '"displayName" length must be at least 8 characters long',
  },
  'passwordstring.min': {
    code: 400,
    message: '"password" length must be 6 characters long',
  },
  'emailstring.email': {
    code: 400,
    message: '"email" must be a valid email',
  },
  'emailany.required': {
    code: 400,
    message: '"email" is required',
  },
  'passwordany.required': {
    code: 400,
    message: '"password" is required',
  },
  emailNotFound: {
    code: 400,
    message: 'Invalid fields',
  },
  loginInvalid: {
    code: 400,
    message: 'Invalid fields',
  },
  tokenEmpty: {
    code: 401,
    message: 'Token not found',
  },
  tokenInvalid: {
    code: 401,
    message: 'Expired or invalid token',
  },
  userNotExists: {
    code: 404,
    message: 'User does not exist',
  },
};

const handdleGenericErrors = (error, _request, response, _next) => {
  if (TYPES[error]) {
    const { code, message } = TYPES[error];
    return response.status(code).json({ message });
  }
  if (error.details) {
    const [details] = error.details;
    const err = details.path[0] + details.type;

    if (TYPES[err]) {
      const { code, message } = TYPES[err];
      return response.status(code).json({ message });
    }
    return response.status(400).json({ message: details.message });
  }
  console.log(error);
  return response.status(500).json({ message: 'Interval error' });
};

module.exports = handdleGenericErrors;
