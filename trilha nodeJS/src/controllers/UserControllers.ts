import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const userRepository = getRepository(User);
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
