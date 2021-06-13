import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteEmailUseCase } from './DeleteEmailUseCase';

class DeleteEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteEmailUseCase = container.resolve(DeleteEmailUseCase);

    await deleteEmailUseCase.execute(id);

    return response.status(200).send();
  }
}

export { DeleteEmailController };
