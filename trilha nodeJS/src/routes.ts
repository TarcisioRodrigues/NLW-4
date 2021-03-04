import { Router } from 'express';
import { UserController } from './controllers/UserControllers';
import { SurveyController } from './controllers/SurveyController';

const router = Router();
const userControllers = new UserController();
const surveyControllers = new SurveyController();
router.post('/users', userControllers.create);
router.post('/survey', surveyControllers.create);
router.get('/listsurvey', surveyControllers.index);
export { router };
