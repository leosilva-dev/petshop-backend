import { StatusCodes } from "http-status-codes"
import {Request, Response} from 'express'
import { User } from "../models/User"


const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email, password})
        
        
        if(!user){
            res.status(StatusCodes.UNAUTHORIZED).json({msg:'Usuário ou senha inválidos'})
        }else{
            res.status(StatusCodes.OK).json({msg:'Login successful', user, token: 'JWT-123456'})
        }


    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error:error})
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

        const newUser = await new User({name, email, password, username, bio})
        newUser.save()

        return res.status(StatusCodes.CREATED).json(newUser)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error:error})
    }
}

export const AuthController = {
    login,
    register
}