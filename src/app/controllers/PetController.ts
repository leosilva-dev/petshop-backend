import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { IRequestResult } from "../../interfaces/IRequestResult"
import { Pet } from "../models/Pet"

const create = async (req: Request, res: Response) => {
    try {
        const {name, age, owner, specie} = req.body

        if(await Pet.findOne({ name, owner })){
          return res.status(StatusCodes.BAD_REQUEST).json({msg:'Pet já cadastrado'})
        }

        await Pet.create({name, age, owner, specie})

        const petRegistered = await Pet.findOne({name, owner})
        
        const response: IRequestResult = {
            data: petRegistered,
            success: true,
            message: 'Pet cadastrado com sucesso'
        } 
        return res.status(StatusCodes.CREATED).json(response)
        
    } catch (error) {

        const response: IRequestResult = {
            data: undefined,
            success: false,
            message: 'Erro ao cadastrar pet, tente novamente mais tarde...'
        } 

        console.log(error)

        res.status(StatusCodes.BAD_REQUEST).json(response)
    }
}

const getAll = async (_:Request, res: Response) => {
    try {
        const allClients = await Pet.find()    
        res.status(StatusCodes.OK).json(allClients)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error:error})
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const petById = await Pet.findById(id)
        
        const response: IRequestResult = {
            data: petById,
            success: true,
            message: 'Pet encontrado com sucesso'
        } 

        res.status(StatusCodes.OK).json(response)        
    } catch (error) {

        const response: IRequestResult = {
            data: undefined,
            success: false,
            message: 'Pet não encontrado'
        } 

        res.status(StatusCodes.BAD_REQUEST).json(response)
    }
}

const updateById = async (req:Request, res:Response) => {
    try {
        const id = req.params.id

        const {name, age, owner, specie} = req.body

        await Pet.findByIdAndUpdate(id, {name, age, owner, specie})

        const petUpdated = await Pet.findById(id)

        const response: IRequestResult = {
            data: petUpdated,
            success: true,
            message: 'Pet atualizado com sucesso'
        }

        res.status(StatusCodes.OK).json(response)
    } catch (error) {

        const response: IRequestResult = {
            data: undefined,
            success: false,
            message: 'Erro ao atualizar pet'
        }
        res.status(StatusCodes.BAD_REQUEST).json(response)
    }
}

const deleteById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        await Pet.deleteOne({_id: id})

        const response: IRequestResult = {
            data: undefined,
            success: true,
            message: 'Pet excluído com sucesso'
        }        
        
        res.status(StatusCodes.OK).json({msg:response})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error:error})
    }
}

export const PetController = {
    create,
    getAll,
    getById,
    updateById,
    deleteById
}