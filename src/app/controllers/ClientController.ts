import { StatusCodes } from 'http-status-codes';
import {Request, Response} from 'express'

import {Client} from '../models'
import { IRequestResult } from '../../interfaces/IRequestResult';

const create = async (req: Request, res: Response) => {
    try {
        const {name, email} = req.body

        if(await Client.findOne({ email })){
          return res.status(StatusCodes.BAD_REQUEST).json({msg:'Email já cadastrado'})
        }

        await Client.create({name, email})

        const clientRegistered = await Client.findOne({email})
        
        const response: IRequestResult = {
            data: clientRegistered,
            success: true,
            message: 'Cliente cadastrado com sucesso'
        } 
        return res.status(StatusCodes.CREATED).json(response)
        
    } catch (error) {

        const response: IRequestResult = {
            data: undefined,
            success: false,
            message: 'Erro ao cadastrar cliente, tente novamente mais tarde...'
        } 

        console.log(error)

        res.status(StatusCodes.BAD_REQUEST).json(response)
    }
}

const getAll = async (_:Request, res: Response) => {
    try {
        const allClients = await Client.find()    
        res.status(StatusCodes.OK).json(allClients)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error:error})
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const clientById = await Client.findById(id)
        
        const response: IRequestResult = {
            data: clientById,
            success: true,
            message: 'Cliente encontrado com sucesso'
        } 

        res.status(StatusCodes.OK).json(response)        
    } catch (error) {

        const response: IRequestResult = {
            data: undefined,
            success: false,
            message: 'Cliente não encontrado'
        } 

        res.status(StatusCodes.BAD_REQUEST).json(response)
    }
}

const updateById = async (req:Request, res:Response) => {
    try {
        const id = req.params.id

        const {name, email} = req.body

        await Client.findByIdAndUpdate(id, {name, email})

        const clientUpdated = await Client.findById(id)

        const response: IRequestResult = {
            data: clientUpdated,
            success: true,
            message: 'Cliente atualizado com sucesso'
        }

        res.status(StatusCodes.OK).json(response)
    } catch (error) {

        const response: IRequestResult = {
            data: undefined,
            success: false,
            message: 'Erro ao atualizar cliente'
        }
        res.status(StatusCodes.BAD_REQUEST).json(response)
    }
}

const deleteById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        await Client.deleteOne({_id: id})

        const response: IRequestResult = {
            data: undefined,
            success: true,
            message: 'Cliente excluído com sucesso'
        }        
        
        res.status(StatusCodes.OK).json({msg:response})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error:error})
    }
}


export const ClientController = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}