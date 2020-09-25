import { Request, Response } from 'express';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!name || !email || !password) {
      throw new Error('Por favor, insira todas as infomações necessárias')
    }

    if (password.length < 8) {
      throw new Error('A senha deve ter no mínimo seis(8) caracteres')
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(password);

    const userDatabase = new UserDatabase();
    await userDatabase.registerUser(
      id,
      name,
      email,
      hashPassword,
    )

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id });

    res.status(200).send({
      message: 'Usuário criado com sucesso',
      token
    });

  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
}