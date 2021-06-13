import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IEmailsRepository } from '../../repositories/IEmailsRepository';

interface IEmailDTO {
  email: string;
  customer_id?: string;
  contact_id?: string;
}

@injectable()
class CreateEmailUseCase {
  constructor(
    @inject('EmailsRepository')
    private emailsRepository: IEmailsRepository,
  ) {}

  async execute({ email, customer_id, contact_id }: IEmailDTO): Promise<void> {
    if (customer_id) {
      const emailAlreadyExists =
        await this.emailsRepository.findEmailByCustomer(customer_id, email);

      if (emailAlreadyExists) {
        throw new AppError('The customer already has this email registered.');
      }
    }

    if (contact_id) {
      const emailAlreadyExists = await this.emailsRepository.findEmailByContact(
        contact_id,
        email,
      );

      if (emailAlreadyExists) {
        throw new AppError('The contact already has this email registered.');
      }
    }

    this.emailsRepository.create({
      email,
      customer_id,
      contact_id,
    });
  }
}

export { CreateEmailUseCase, IEmailDTO };
