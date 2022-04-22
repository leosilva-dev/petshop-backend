import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { IRequestResult } from "../../interfaces/IRequestResult"
import { Link } from "../models/Links"

const getAll = async (req: Request, res: Response) => {
    try{
        const allLinks = await Link.find({user: req.userId})
        allLinks.sort((a, b) => a.order - b.order)

        const response: IRequestResult = {
            data: allLinks,
            success: true,
        } 

        res.status(StatusCodes.OK).json(response)

    }catch(err){

        const response: IRequestResult = {
            data: undefined,
            success: false,
            message: 'Erro ao recuperar dados do usuário'
        } 
        return res.status(StatusCodes.BAD_REQUEST).json(response)
    }
}

export const LinksController = {
    getAll
}