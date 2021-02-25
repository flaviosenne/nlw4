import {Router} from 'express'
import { SendEmailController } from './controllers/SendMailController'
import { SurveysController } from './controllers/SurveysController'
import { UserController } from './controllers/UserController'

const routes = Router()
const userController = new UserController()
const surveysController = new SurveysController()
const sendEmailController = new SendEmailController()

routes.post('/users', userController.create)

routes.post('/surveys', surveysController.create)
routes.get('/surveys', surveysController.show)

routes.post('/send-email', sendEmailController.execute)

export default routes