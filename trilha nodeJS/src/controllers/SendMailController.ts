import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import SendMailService from '../servicces/SendMailService';
import { resolve } from 'path';
class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;
    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const userAlreadyExisits = await usersRepository.findOne({ email });
    if (!userAlreadyExisits) {
      return response.status(400).json({
        error: 'User does no exists',
      });
    }
    const survey = await surveysRepository.findOne({
      id: survey_id,
    });
    if (!survey) {
      return response.status(400).json({
        error: 'User does no exists',
      });
    }

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: { user_id: userAlreadyExisits.id, value: null },
      relations: ['user', 'survey'],
    });
    const variables = {
      name: userAlreadyExisits.name,
      title: survey.title,
      description: survey.description,
      id: '',
      link: process.env.URL_MAIL,
    };
    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return response.json(surveyUserAlreadyExists);
    }
    //Salvar  as informações na tabela survey_user
    const surveyUser = surveysUsersRepository.create({
      user_id: userAlreadyExisits.id,
      survey_id,
    });

    await surveysUsersRepository.save(surveyUser);
    variables.id = surveyUser.id;

    await SendMailService.execute(email, survey.title, variables, npsPath);
    //Enviar o e-mail para o usuario

    return response.json(surveyUser);
  }
}
export { SendMailController };
