import { Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { User } from '../models/Usert'

class UserController {
    async create(req: Request, res: Response){
        const { name, email} =req.body

        const userRepository = getRepository(User)

        const user = userRepository.create({
            name, email
        })

        await userRepository.save(user)
        return res.json(user)
    }
}

export { UserController}