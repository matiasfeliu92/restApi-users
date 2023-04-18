import { Request, Response } from 'express';
import { User } from '../models/users.models';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

class UserController {

    async getAllUsers(req: Request, res: Response) {
        const userRepository = getRepository(User)
        const users = await userRepository.find();
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

    async signUp(req: Request, res: Response) {
      try {
        const { name, age, country, email, password, job_occupation } = req.body;
    
        const newUser = new User();
        newUser.name = name;
        newUser.age = age;
        newUser.country = country;
        newUser.email = email;
        newUser.password = await bcrypt.hash(password, 10); 
        newUser.job_occupation = job_occupation;
    
        await getRepository(User).save(newUser);
        console.log('new user registered');
    
        const { password: _, ...userWithoutPassword } = newUser;
        return res.status(201).json({
          message: 'User created successfully',
          user: userWithoutPassword,
        });
        
      } catch (error) {
        res.status(500).json({ message: error });
      }
    }

    async signIn(req:Request, res:Response) {
      try {

        const { email, password } = req.body
        const userRepository = getRepository(User)
        const user = await userRepository.findOne({ where: {email} });
        const passwordMatches = await bcrypt.compare(password, user!.password);

        if(!user || !passwordMatches) {
          return res.status(401).json({ message: 'Invalid credentials' });
        } else {
          return res.status(200).json({ message: `Welcome ${user!.name}` }); 
        }

      } catch (error) {
        res.status(500).json({ message: error });
      }
    }
}

export default UserController;
