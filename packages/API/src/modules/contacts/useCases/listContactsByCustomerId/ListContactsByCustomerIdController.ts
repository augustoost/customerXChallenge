import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListContactsByCustomerIdUseCase } from './ListContactsByCustomerIdUseCase';

class ListContactsByCustomerIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listContactsByCustomerIdUseCase = container.resolve(
      ListContactsByCustomerIdUseCase,
    );

    const all = await listContactsByCustomerIdUseCase.execute(id);

    return response.json(all);
  }
}

export { ListContactsByCustomerIdController };
