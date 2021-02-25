import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepositor';
import SendMailService from '../services/SendMailService';
class SendEmailController {

    async execute(req: Request, res: Response){

        const { email, survey_id} = req.body

        const usersRepository = getCustomRepository(UserRepository)
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)
    
        const userAlreadyExist = await usersRepository.findOne({email})
        
        if(!userAlreadyExist){
            return res.status(404).json({msg: "user not exists"})
        }
        
        const survey = await surveysRepository.findOne({id: survey_id})
        
        if(!survey){
            return res.status(404).json({msg: "survey not exists"})
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExist.id,
            survey_id
        })
        await surveysUsersRepository.save(surveyUser)
        await SendMailService.execute(email, survey.title.toString(), survey.description.toString())

        return res.status(201).json(surveyUser)
    }
}

export { SendEmailController}