import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeletePhoneUseCase } from './DeletePhoneUseCase';

class DeletePhoneController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePhoneUseCase = container.resolve(DeletePhoneUseCase);

    await deletePhoneUseCase.execute(id);

    return response.status(200).send();
  }
}

export { DeletePhoneController };
