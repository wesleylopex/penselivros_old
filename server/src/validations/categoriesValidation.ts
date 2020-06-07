import { Joi } from "celebrate";

export default {
  body: Joi.object().keys({
    title: Joi.string().required(),
    is_active: Joi.boolean().required(),
  }),
};
