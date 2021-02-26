import { AppError } from './../errors/AppError';
import { Request, Response} from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import * as yup from 'yup'

class UserController {
    async create(req: Request, res: Response){
        const { name, email} =req.body

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        })

        if(!(await schema.isValid({name, email})))
        throw new AppError("validation faild")
        
        
        const userRepository = getCustomRepository(UserRepository)
        
        const userAlreadyExists = await userRepository.findOne({
            email
        })
        
        if(userAlreadyExists) 
        throw new AppError("user aready exist")

        const user = userRepository.create({
            name, email
        })

        await userRepository.save(user)
        return res.status(201).json(user)
    }
}

export { UserController}