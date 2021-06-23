const errorCodeToMessage = {
  "auth.invalidCredentials":
    "Invalid Credentials. Check credentials and try again, or create an account if you haven't already.",
  "auth.existingCredentials":
    "Looks like you already have an account. Please log in.",
  "auth.noToken":
    "Password reset link has expired. Please reset your password again from the login page.",
  "No authorization token was found": "Your session has expired.",
  "user.unauthorized": "Your session has expired.",
  "name must be unique": "That record already exists",
};

// Pass array of errors to handleErrors fn
const handleErrorsArray = (array) => {
  const errors = array.map(handleErrors);
  return errors;
};

// Return error message
const handleErrors = (errorCode) => {
  const errorMessage = errorCodeToMessage[errorCode];

  if (errorMessage) {
    return { error: errorMessage };
  }

  return {
    error:
      "Uh-oh, something is unexpectedly broken. Please contact support if the problem persists.",
  };
};

export { handleErrors, handleErrorsArray };
