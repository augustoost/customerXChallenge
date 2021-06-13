import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePhoneUseCase, IPhoneDTO } from './CreatePhoneUseCase';

interface ICreatePhones {
  phones: string[];
  customer_id?: string;
  contact_id?: string;
}

class CreatePhoneController {
  async handle({
    phones,
    customer_id,
    contact_id,
  }: ICreatePhones): Promise<void> {
    const createPhoneUseCase = container.resolve(CreatePhoneUseCase);

    phones.forEach(async phone => {
      await createPhoneUseCase.execute({ phone, customer_id, contact_id });
    });
  }
}

export { CreatePhoneController };
