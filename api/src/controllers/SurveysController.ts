import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { SurveysRepository } from '../repositories/SurveysRepository';
class SurveysController {
    
    async create(req: Request, res: Response){
        const { title, description} = req.body
        
        const surveysRepository = getCustomRepository(SurveysRepository)
        
        const surveys = surveysRepository.create({title, description})
        
        await surveysRepository.save(surveys)
        
        return res.status(201).json(surveys)
    }
    
    async show(req: Request, res: Response){
        const surveysRepository = getCustomRepository(SurveysRepository)
        
        const surveys = await surveysRepository.find()

        return res.status(200).json(surveys)
    }
}

export { SurveysController}