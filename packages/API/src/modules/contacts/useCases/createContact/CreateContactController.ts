import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateContactUseCase } from './CreateContactUseCase';

class CreateContactController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { customer_id, name, emails, phones } = request.body;

    const createContactUseCase = container.resolve(CreateContactUseCase);

    await createContactUseCase.execute({ customer_id, name, emails, phones });

    return response.status(201).send(); //Contact created
  }
}

export { CreateContactController };
