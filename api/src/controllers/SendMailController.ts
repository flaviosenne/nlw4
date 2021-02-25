import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepositor';
import SendMailService from '../services/SendMailService';
import {resolve} from 'path'
class SendEmailController {

    async execute(req: Request, res: Response){

        const { email, survey_id} = req.body

        const usersRepository = getCustomRepository(UserRepository)
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)
    
        const user = await usersRepository.findOne({email})
        
        if(!user){
            return res.status(404).json({msg: "user not exists"})
        }
        
        const survey = await surveysRepository.findOne({id: survey_id})
        
        if(!survey){
            return res.status(404).json({msg: "survey not exists"})
        }

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: [{user_id: user.id}, {value: null}],
            relations:["user", "survey"]
        })

        const item = [1,2,3,4,5,6,7,8,9,10]
        const variable = {
            item,
            name: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            url: process.env.URL_MAIL

        }
        const npsPath = resolve(__dirname, '../','views/', 'emails/','npsMail.hbs')
        
        if(surveyUserAlreadyExists){
            await SendMailService.execute(email, survey.title.toString(), variable, npsPath)
            return res.status(201).json(surveyUserAlreadyExists)
        }
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id
        })
        await surveysUsersRepository.save(surveyUser)
        
        
        await SendMailService.execute(
            email,
            survey.title.toString(),
            variable, npsPath)

        return res.status(201).json(surveyUser)
    }
}

export { SendEmailController}