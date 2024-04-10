const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// imageUrl: Joi.string().required().custom(validateURL).messages({
//     'string.empty': 'The "imageUrl" field must be filled in',
//     'string.uri': 'the "imageUrl" field must be a valid url',
//   }),

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),

    weather: Joi.string().valid("hot", "warm", "cold").required().messages({
      "string.empty": "Weather condition must be selected",
      "string.valid": "Invalid weather condition",
    }),
  }),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),

    email: Joi.string().required().email().messages({
      "string.empty": 'The "Email" field must be filled in',
      "string.email": 'the "Email" field must be a valid email address',
    }),

    password: Joi.string().required().messages({
      "string.empty": 'The "Password" field must be filled in',
    }),
  }),
});

module.exports.validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

module.exports.validateLoginRequest = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "Email" field must be filled in',
      "string.email": 'the "Email" field must be a valid email address',
    }),

    password: Joi.string().required().messages({
      "string.empty": 'The "Password" field must be filled in',
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().min(24).max(24).messages({
      "string.min": "The resource ID is invalid",
      "string.max": "The resource ID is invalid",
      "string.empty": "The resource ID is invalid",
    }),
  }),
});
