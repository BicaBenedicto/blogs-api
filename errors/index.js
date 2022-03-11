const TYPES = {
  emailAlreadyExists: {
    code: 409,
    message: 'User already registered',
  },
};

const handdleGenericErrors = (error, _request, response, _next) => {
  if (error.details) {
    const [details] = error.details;
    console.log(details);
    return response.status(400).json({ message: details.message });
  }
  if (TYPES[error]) {
    const { code, message } = TYPES[error];
    return response.code(code).json({ message });
  }

  console.log(error);
  return response.status(500).json({ message: 'Interval error' });
};

module.exports = handdleGenericErrors;
