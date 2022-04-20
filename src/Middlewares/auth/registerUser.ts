import { celebrate, Joi } from 'celebrate';

const registerValidation = celebrate({
    body: Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().required(),
        bio: Joi.string().required(),
        password: Joi.string().required(),
    })
}, {abortEarly: false});

export const auth ={
    registerValidation
}