import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdatePhoneUseCase } from './UpdatePhoneUseCase';

class UpdatePhoneController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { phone } = request.body;
    const { id } = request.params;

    const updatePhoneUseCase = container.resolve(UpdatePhoneUseCase);

    await updatePhoneUseCase.execute({ phone, phone_id: id });

    return response.status(200).send();
  }
}

export { UpdatePhoneController };
