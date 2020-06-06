import { Joi } from "celebrate";

export default {
  body: Joi.object().keys({
    title: Joi.string().required(),
    author: Joi.string().required(),
    image: Joi.string().required(),
    user_id: Joi.number(),
    reserved_at: Joi.date(),
    category_id: Joi.number().required(),
  }),
};
