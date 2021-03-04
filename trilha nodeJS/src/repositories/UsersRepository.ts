import { Entity, EntityRepository, Repository } from 'typeorm';

import { User } from '../models/User';
//Classe que vai pegar todos os métodos do Typeorm
@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export { UsersRepository };
