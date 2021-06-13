import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';

import { ListContactByIdUseCase } from './ListContactByIdUseCase';

class ListContactByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listContactByIdUseCase = container.resolve(ListContactByIdUseCase);

    const contact = await listContactByIdUseCase.execute(id);

    if (!contact) {
      throw new AppError('Contact does not exists', 404);
    }
    return response.json(contact);
  }
}

export { ListContactByIdController };
