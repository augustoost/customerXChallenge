import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateContactUseCase } from './UpdateContactUseCase';

class UpdateContactController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;

    const updateContactUseCase = container.resolve(UpdateContactUseCase);

    await updateContactUseCase.execute({ name, contact_id: id });

    return response.status(200).send();
  }
}

export { UpdateContactController };
