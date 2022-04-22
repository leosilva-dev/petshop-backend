import { StatusCodes } from 'http-status-codes';
import {Request, Response} from 'express'

import {User} from '../models/User'
import { Link } from '../models/Links';
import { IRequestResult } from '../../interfaces/IRequestResult';

const getById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const userById = await User.findById(id)
        const links = await Link.find({user: id})

        const response: IRequestResult = {
            data: {userById, links},
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

const getData = async (req: Request, res: Response) => {
    try {
        const id = req.userId
        const userById = await User.findById(id).select('-password')

        const response: IRequestResult = {
            data: userById,
            success: true,
        } 

        res.status(StatusCodes.OK).json(response)        
    } catch (error) {

        const response: IRequestResult = {
            data: undefined,
            success: false,
            message: 'Erro ao recuperar dados do usuário'
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



const updateById = async (req:Request, res:Response) => {
    try {
        const id = req.params.id || req.userId

        const {name, email, username, bio, links} = req.body

        await User.findByIdAndUpdate(id, {name, email, username, bio})

        await Link.deleteMany({user: id})

        await Promise.all(
            links.map(async (link:any) => {
                const newLink = new Link({
                    title: link.title,
                    url: link.url,
                    enabled: link.enabled,
                    order: link.order,
                    user: id
                })
                return await newLink.save()
            })
        )

        const userUpdated = await User.findById(id)
        const linksUpdateds = await Link.find({user: id})


        const response: IRequestResult = {
            data: {userUpdated, linksUpdateds},
            success: true,
            message: 'Usuário atualizado com sucesso'
        }

        res.status(StatusCodes.OK).json(response)
    } catch (error) {

        const response: IRequestResult = {
            data: undefined,
            success: false,
            message: 'Erro ao atualizar usuário'
        }
        res.status(StatusCodes.BAD_REQUEST).json(response)
    }
}

const deleteById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const resultOfAction = await User.deleteOne({_id: id})
        await Link.deleteMany({user: id})

        res.status(StatusCodes.OK).json({msg:resultOfAction})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error:error})
    }
}

const getProfilePublicData = async (req: Request, res: Response) => {
    try {
        const username = req.params.username
        const userByUsername = await User.findOne({username}).select('-password')

        if(userByUsername) {   
            const allLinks = await Link.find({user: userByUsername._id})
            allLinks.sort((a, b) => a.order - b.order)
            
            const result = {
                user: {
                    name: userByUsername.name,
                    username: userByUsername.username,
                    bio: userByUsername.bio,
                    email: userByUsername.email,
                },
                links: allLinks.filter((link:any) => link.enabled).map((link:any) => {
                    return {
                        title: link.title,
                        url: link.url,
                    }
                })
            }

            const response: IRequestResult = {
                data: result,
                success: true,
            } 

            res.status(StatusCodes.OK).json(response)        
        }else{
            const response: IRequestResult = {
                data: undefined,
                success: false,
                message: 'Usuário não encontrado'
            } 
            res.status(StatusCodes.BAD_REQUEST).json(response)
        }



    } catch (error) {

        const response: IRequestResult = {
            data: undefined,
            success: false,
            message: 'Erro ao recuperar dados do usuário'
        } 
        res.status(StatusCodes.BAD_REQUEST).json(response)
    }
}

export const UserController = {
    getById,
    getData,
    getAll,
    updateById,
    deleteById,
    getProfilePublicData
}