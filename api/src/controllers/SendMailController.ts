import { AppError } from './../errors/AppError';
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
            throw new AppError("user not exists", 404)
        }
        
        const survey = await surveysRepository.findOne({id: survey_id})
        
        if(!survey){
            throw new AppError("survey not exists", 404)
        }

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: {user_id: user.id, value: null},
            relations:["user", "survey"]
        })

        const item = [1,2,3,4,5,6,7,8,9,10]
        
        const npsPath = resolve(__dirname, '../','views/', 'emails/','npsMail.hbs')
        
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id
        })
        const variable = {
            item,
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            url: process.env.URL_MAIL
            
        }
        if(surveyUserAlreadyExists){
            variable.id = surveyUserAlreadyExists.id.toString();
            
            await SendMailService.execute(email, survey.title.toString(), variable, npsPath)
            return res.status(201).json(surveyUserAlreadyExists)
        }
        await surveysUsersRepository.save(surveyUser)
        
        variable.id = surveyUser.id.toString()
        await SendMailService.execute(
            email,
            survey.title.toString(),
            variable, npsPath)

        return res.status(201).json(surveyUser)
    }
}

export { SendEmailController}