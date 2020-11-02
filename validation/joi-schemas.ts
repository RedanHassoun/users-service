import * as Joi from 'joi';

export const userDtoJoiSchema = Joi.object().keys({
    name: Joi.string().min(2).max(256).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(256).required()
}).options({ allowUnknown: true, abortEarly: false});
