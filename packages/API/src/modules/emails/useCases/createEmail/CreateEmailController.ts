import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateEmailUseCase } from './CreateEmailUseCase';

interface ICreateEmails {
  emails: string[];
  customer_id?: string;
  contact_id?: string;
}

class CreateEmailController {
  async handle({
    emails,
    customer_id,
    contact_id,
  }: ICreateEmails): Promise<void> {
    const createEmailUseCase = container.resolve(CreateEmailUseCase);

    emails.forEach(async email => {
      await createEmailUseCase.execute({ email, customer_id, contact_id });
    });
  }
}

export { CreateEmailController };
