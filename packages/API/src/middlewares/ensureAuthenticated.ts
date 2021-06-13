import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { UserRepository } from '../modules/accounts/repositories/UserRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  // Token = Bearer f4w98f4w8f48wf4w98
  // Com o split eu divido a string acima em duas usado como referência o espaço.
  // na posição 0 ficará Bearer e na porisção 1 o token, que será passado para
  // uma constante chamada token.
  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '90a1ebff8f38601eb04bae1a07a8add7',
    ) as IPayload;

    const userRepository = new UserRepository();

    const user = userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    next();
  } catch {
    throw new AppError('Invalid token!', 401);
  }
}
