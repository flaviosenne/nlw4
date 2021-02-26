import { AppError } from './../errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepositor';

class AnswerController {
    async execute(req: Request, res: Response){

        const { u } = req.query
        const { value } = req.params

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        })

        if(!surveyUser){
            throw new AppError("Survey User does not exists", 404)
        }

        surveyUser.value = Number(value)

        await surveysUsersRepository.save(surveyUser)

        return res.status(201).json(surveyUser)
    }
}

export { AnswerController}