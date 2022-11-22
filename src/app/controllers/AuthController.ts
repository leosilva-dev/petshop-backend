import { StatusCodes } from "http-status-codes"
import {Request, Response} from 'express'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import {IRequestResult} from '../../interfaces/IRequestResult'
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
                
        const responseUserOrPasswordInvalid: IRequestResult = {
            data: undefined,
            token: undefined,
            success: false,
            message: 'Usuário ou senha inválidos'
        } 
        if(!user){
            return res.status(StatusCodes.UNAUTHORIZED).json(responseUserOrPasswordInvalid)
        }
        
        if(user && !await bcrypt.compare(password, user.password)){
            return res.status(StatusCodes.UNAUTHORIZED).json(responseUserOrPasswordInvalid)
        }

        const userLogged = await User.findOne({ email }).select("-password")

        const response: IRequestResult = {
            data: userLogged,
            token: generateToken(userLogged?.id),
            success: true,
            message: 'Usuário logado com sucesso'
        } 

        return res.status(StatusCodes.OK).json(response)


    } catch {

        const response: IRequestResult = {
            data: undefined,
            token: undefined,
            success: false,
            message: 'Erro ao logar usuário, tente novamente mais tarde...'
        } 

        res.status(StatusCodes.BAD_REQUEST).json(response)
    }
}

const register = async (req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body

        if(await User.findOne({ email })){
          return res.status(StatusCodes.BAD_REQUEST).json({msg:'Email já cadastrado'})
        }
        

        await User.create({name, email, password})

        const userRegistered = await User.findOne({ email}).select("-password")
        
        const response: IRequestResult = {
            data: userRegistered,
            token: generateToken(userRegistered?.id),
            success: true,
            message: 'Usuário cadastrado com sucesso'
        } 
        return res.status(StatusCodes.CREATED).json(response)
        
    } catch (error) {

        const response: IRequestResult = {
            data: undefined,
            token: undefined,
            success: false,
            message: 'Erro ao cadastrar usuário, tente novamente mais tarde...'
        } 

        res.status(StatusCodes.BAD_REQUEST).json(response)
    }
}

export const AuthController = {
    login,
    register
}