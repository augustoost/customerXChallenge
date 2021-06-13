import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListContactsUseCase } from './ListContactsUseCase';

class ListContactsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listContactsUseCase = container.resolve(ListContactsUseCase);

    const all = await listContactsUseCase.execute();

    return response.json(all);
  }
}

export { ListContactsController };
