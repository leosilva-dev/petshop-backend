import { celebrate, Joi } from 'celebrate';

const create = celebrate({
    body: Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        owner: Joi.string().required(),
        specie: Joi.string().required()
    })
})

export const PetValidate = {
    create
}