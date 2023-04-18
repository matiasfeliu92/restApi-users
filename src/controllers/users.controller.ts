import { Request, Response } from 'express';
import { User } from '../models/users.models';
import { getRepository } from 'typeorm';

class UserController {

    async getAllUsers(req: Request, res: Response) {
        const userRepository = getRepository(User)
        const users = await userRepository.find();
        console.log(users);
        res.status(200).json(users);
    }

    async getUserById(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const userRepository = getRepository(User)
          const user = await userRepository.findOne({ where: { id: Number(id) }});
          if (!user) {
            res.status(404).json({ message: 'User not found' });
          } else {
            res.status(200).json(user);
          }
        } catch (error) {
          res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default UserController;
