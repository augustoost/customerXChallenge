import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCustomerUseCase } from './CreateCustomerUseCase';

class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, emails, phones } = request.body;

    const createCustomerUseCase = container.resolve(CreateCustomerUseCase);

    await createCustomerUseCase.execute({ name, emails, phones });

    return response.status(201).send(); //Customer created
  }
}

export { CreateCustomerController };
