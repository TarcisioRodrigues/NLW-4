import { Router } from 'express';
import { UserController } from './controllers/UserControllers';
import { SurveyController } from './controllers/SurveyController';
import { SendMailController } from './controllers/SendMailController';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';

const router = Router();
const userControllers = new UserController();
const surveyControllers = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();
router.post('/users', userControllers.create);
router.post('/survey', surveyControllers.create);
router.get('/listsurvey', surveyControllers.index);

router.post('/send', sendMailController.execute);
router.get('/answers/:value', answerController.execute);
router.get('/nps/:survey_id', npsController.execute);
export { router };
