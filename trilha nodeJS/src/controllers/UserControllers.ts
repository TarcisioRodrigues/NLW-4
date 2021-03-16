import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import SendMailService from '../servicces/SendMailService';
import * as yup from 'yup';
class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;
    //Fazendo validações
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });
    //if (!(await schema.isValid(request.body))) {
    //   return response.status(400).json({ error: 'Validation failed' });
    //}
    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: 'Validation failed' });
    }
    const userRepository = getCustomRepository(UsersRepository);
    const userAlreadyExist = await userRepository.findOne({
      email,
    });
    //Checando se o email ja existe!
    if (userAlreadyExist) {
      return response.status(400).json({
        error: 'User already exists!',
      });
    }
    const user = userRepository.create({
      name,
      email,
    });
    await userRepository.save(user);

    return response.json('Salvado com Sucesso');
  }
}

export { UserController };
