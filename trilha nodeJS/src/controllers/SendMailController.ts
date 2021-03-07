import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';

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
    const surveysAlreadyExists = await surveysRepository.findOne({
      id: survey_id,
    });
    if (!surveysAlreadyExists) {
      return response.status(400).json({
        error: 'User does no exists',
      });
    }
    //Salvar  as informações na tabela survey_user
    const surveyUser = surveysUsersRepository.create({
      user_id: userAlreadyExisits.id,
      survey_id,
    });
    await surveysUsersRepository.save(surveyUser);
    //Enviar o e-mail para o usuario

    return response.json(surveyUser);
  }
}
export { SendMailController };
