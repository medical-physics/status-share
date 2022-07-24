const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

exports.validateLoginData = (data) => {
  const errors = {};

  if (data.email === '@bccancer.bc.ca') errors.email = 'Must not be empty';
  if (isEmpty(data.password)) errors.password = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0
  };
};

exports.validateBasicAuth = (authHeader) => {
  let basicAuthError = false;
  let email;
  let password;

  try {
    basicAuthError = authHeader.split(' ')[0] !== 'Basic';
    const decodedAuth = Buffer.from(authHeader.split(' ')[1], 'base64').toString();
    email = decodedAuth.split(':')[0];
    password = decodedAuth.split(':')[1];
  } catch (error) {
    basicAuthError = true;
  }

  return {
    basicAuthError,
    email,
    password
  }
};
