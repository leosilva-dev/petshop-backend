import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface TokenPayload {
    id: string;
}

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

