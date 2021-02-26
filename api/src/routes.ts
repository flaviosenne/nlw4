import {Router} from 'express'
import { AnswerController } from './controllers/AnswerController'
import { NpsController } from './controllers/NpsController'
import { SendEmailController } from './controllers/SendMailController'
import { SurveysController } from './controllers/SurveysController'
import { UserController } from './controllers/UserController'

const routes = Router()
const userController = new UserController()
const surveysController = new SurveysController()
const sendEmailController = new SendEmailController()
const answerController = new AnswerController()
const npsController = new NpsController()

routes.post('/users', userController.create)

routes.post('/surveys', surveysController.create)
routes.get('/surveys', surveysController.show)

routes.post('/send-email', sendEmailController.execute)

routes.get('/answers/:value', answerController.execute)

routes.get('/nps/:survey_id', npsController.execute)

export default routes