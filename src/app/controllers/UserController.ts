import { StatusCodes } from 'http-status-codes';
import {Request, Response} from 'express'

import {User} from '../models/User'
import { Link } from '../models/Links';

const getById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const userById = await User.findById(id)
        const links = await Link.find({user: id})

        res.status(StatusCodes.OK).json({userById, links})        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error:error})
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
        const id = req.params.id

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

        res.status(StatusCodes.OK).json({userUpdated,linksUpdateds})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error:error})
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

export const UserController = {
    getById,
    getAll,
    updateById,
    deleteById
}