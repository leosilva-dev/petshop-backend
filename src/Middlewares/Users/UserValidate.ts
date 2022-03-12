import { celebrate, Joi } from 'celebrate';

const create = celebrate({
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    })
})

export const UsersValidade ={
    create
}