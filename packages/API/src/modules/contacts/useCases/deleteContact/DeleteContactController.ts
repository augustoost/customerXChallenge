import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteContactUseCase } from './DeleteContactUseCase';

class DeleteContactController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteContactUseCase = container.resolve(DeleteContactUseCase);

    await deleteContactUseCase.execute(id);

    return response.status(200).send();
  }
}

export { DeleteContactController };
