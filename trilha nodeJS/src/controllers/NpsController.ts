import { Request, response, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
//Caculo de nps
//1 2 3 4 5 6 7 8 9 10
//Detratores->0 a 6
//Passivos->7-8
//Promotores->9-10
//(Promotores -detratores)/(numero de respondentes) x 100
class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
    const surveysUser = surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });
    const detractor = (await surveysUser).filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;
    const promotors = (await surveysUser).filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;
    const passive = (await surveysUser).filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;
    const totalAnswers = (await surveysUser).length;
    const calculate = Number(
      (((promotors - detractor) / totalAnswers) * 100).toFixed(2)
    );
    return response.json({
      detractor,
      promotors,
      passive,
      totalAnswers,
      nps: calculate,
    });
  }
}

export { NpsController };
