import {Request, Response} from 'express'
import {User} from '../models/User'


const GetAll = async (_:Request, res: Response) => {
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({error:error})
    }
}

const Create = async (req: Request, res: Response) => {
    try {
        const newUser = await new User(req.body)
        newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({error:error})
    }
}

export const UserController = {
    GetAll,
    Create,
}