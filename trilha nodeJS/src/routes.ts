import { Router } from 'express';
import { UserController } from './controllers/UserControllers';
import { SurveyController } from './controllers/SurveyController';
import { SendMailController } from './controllers/SendMailController';

const router = Router();
const userControllers = new UserController();
const surveyControllers = new SurveyController();
const sendMailController = new SendMailController();
router.post('/users', userControllers.create);
router.post('/survey', surveyControllers.create);
router.get('/listsurvey', surveyControllers.index);

router.post('/send', sendMailController.execute);
export { router };
