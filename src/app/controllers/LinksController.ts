import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { Link } from "../models/Links"

const getAll = async (req: Request, res: Response) => {
    try{
        const allLinks = await Link.find({user: req.userId})
        allLinks.sort((a, b) => a.order - b.order)

        res.status(StatusCodes.OK).json({links:allLinks})

    }catch(err){
        console.log(err)
        return res.status(StatusCodes.BAD_REQUEST).json({error:err})
    }
}

export const LinksController = {
    getAll
}