/* eslint-disable no-useless-escape */
import { celebrate, Joi } from 'celebrate';

export const validationOfUserSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/),
  }),
});

export const validationOfUserSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(true).email(),
    password: Joi.string().required(true),
  }),
});

export const validationOfGettingUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required(true).hex().length(24),
  }),
});

export const validationOfAvatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/),
  }),
});

export const validationOfUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});
