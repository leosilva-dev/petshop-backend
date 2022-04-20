import { StatusCodes } from "http-status-codes"
import {Request, Response} from 'express'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import { User } from "../models/User"

dotenv.config();


const generateToken = (id: string) => {
    return jwt.sign({id}, process.env.JWT_SECRET as string, {
        expiresIn: 86400
    })
}

const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email}).select("+password")
                
        if(!user){
            return res.status(StatusCodes.UNAUTHORIZED).json({msg:'Usuário ou senha inválidos'})
        }
        
        if(user && !await bcrypt.compare(password, user.password)){
            return res.status(StatusCodes.UNAUTHORIZED).json({msg:'Usuário ou senha inválidos'})
        }

        const userLogged = await User.findOne({ email}).select("-password")
        return res.status(StatusCodes.OK).json({msg:'Usuário logado com sucesso', User: userLogged, token:generateToken(userLogged?.id)})


    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send({error:error})
    }
}

const register = async (req: Request, res: Response) => {
    try {
        const {name, email, password, username, bio} = req.body

        if(await User.findOne({ email })){
          return res.status(StatusCodes.BAD_REQUEST).json({msg:'Email já cadastrado'})
        }
        if(await User.findOne({ username })){
          return res.status(StatusCodes.BAD_REQUEST).json({msg:'Username já cadastrado'})
        }

        await User.create({name, email, password, username, bio})

        const userRegistered = await User.findOne({ email}).select("-password")
        
        return res.status(StatusCodes.CREATED).json({msg:'Usuário criado com sucesso', User: userRegistered, token:generateToken(userRegistered?.id)})
        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error:error})
    }
}

export const AuthController = {
    login,
    register
}