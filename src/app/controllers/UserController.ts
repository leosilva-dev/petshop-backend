import { StatusCodes } from 'http-status-codes';
import {Request, Response} from 'express'

import {User} from '../models/User'
import { IRequestResult } from '../../interfaces/IRequestResult';

const getById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const userById = await User.findById(id)

        const response: IRequestResult = {
            data: userById,
            success: true,
            message: 'Usuário encontrado com sucesso'
        } 

        res.status(StatusCodes.OK).json(response)        
    } catch (error) {

        const response: IRequestResult = {
            data: undefined,
            success: false,
            message: 'Usuário não encontrado'
        } 

        res.status(StatusCodes.BAD_REQUEST).json(response)
    }
}

const getAll = async (_:Request, res: Response) => {
    try {
        const allUsers = await User.find().select("-password")        
        res.status(StatusCodes.OK).json(allUsers)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error:error})
    }
}





export const UserController = {
    getById,
    getAll,
    }