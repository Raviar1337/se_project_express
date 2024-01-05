const defaultServerError = () =>
  res.status(500).send({ message: "An error has occurred on the server." });

const userNotFoundError = () => {};

const invalidInputError = () => {};

module.exports = { defaultServerError, invalidInputError };
