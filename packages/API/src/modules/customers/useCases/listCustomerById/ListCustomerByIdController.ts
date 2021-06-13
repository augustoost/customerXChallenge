import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';

import { ListCustomerByIdUseCase } from './ListCustomerByIdUseCase';

class ListCustomerByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listCustomerByIdUseCase = container.resolve(ListCustomerByIdUseCase);

    const customer = await listCustomerByIdUseCase.execute(id);

    if (!customer) {
      throw new AppError('Customer does not exists', 404);
    }
    return response.json(customer);
  }
}

export { ListCustomerByIdController };
