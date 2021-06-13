import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  UpdateCustomerUseCase,
  IUpdateCustomerDTO,
} from './UpdateCustomerUseCase';

class UpdateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;

    const updateCustomerUseCase = container.resolve(UpdateCustomerUseCase);

    await updateCustomerUseCase.execute({ name, customer_id: id });

    return response.status(200).send();
  }
}

export { UpdateCustomerController };
