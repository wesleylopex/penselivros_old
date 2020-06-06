import { Joi } from "celebrate";

export default {
  body: Joi.object().keys({
    is_admin: Joi.boolean().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    image: Joi.string(),
  }),
};
