import { Entity, EntityRepository, Repository } from 'typeorm';
import { Survey } from '../models/Survey';

//Classe que vai pegar todos os métodos do Typeorm
@EntityRepository(Survey)
class SurveysRepository extends Repository<Survey> {}

export { SurveysRepository };
