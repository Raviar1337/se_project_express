const JWT_SECRET =
  process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "default";

module.exports = { JWT_SECRET };
