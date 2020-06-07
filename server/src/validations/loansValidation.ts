import { Joi } from "celebrate";

export default {
  body: Joi.object().keys({
    book_id: Joi.number().required(),
    user_id: Joi.number().required(),
    reserved_at: Joi.date(),
  }),
};
