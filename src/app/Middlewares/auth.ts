import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { celebrate, Joi } from 'celebrate';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface TokenPayload {
    id: string;
}

const registerValidation = celebrate({
    body: Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
}, {abortEarly: false});

export const authMiddleware = (req: Request, res: Response, next:NextFunction) => {
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: 'Unauthorized'})
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET as string);
        const { id } = data as TokenPayload;
        
        req.userId = id;

        return next();
    } catch(error) {
        return res.status(401).json({ message: "Unauthorized"});
    }
}

export const auth = {
    registerValidation,
}