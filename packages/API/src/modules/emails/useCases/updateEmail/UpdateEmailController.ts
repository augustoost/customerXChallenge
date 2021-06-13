import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateEmailUseCase, IUpdateEmailDTO } from './UpdateEmailUseCase';

class UpdateEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const { id } = request.params;

    const updateEmailUseCase = container.resolve(UpdateEmailUseCase);

    await updateEmailUseCase.execute({ email, email_id: id });

    return response.status(200).send();
  }
}

export { UpdateEmailController };
