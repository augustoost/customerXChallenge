import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IEmailsRepository } from '../../repositories/IEmailsRepository';

interface IUpdateEmailDTO {
  email: string;
  email_id: string;
}

@injectable()
class UpdateEmailUseCase {
  constructor(
    @inject('EmailsRepository')
    private emailsRepository: IEmailsRepository,
  ) {}

  async execute({ email, email_id }: IUpdateEmailDTO): Promise<void> {
    const emailExists = await this.emailsRepository.findById(email_id);

    if (!emailExists) {
      throw new AppError('Email does not exist.', 404);
    }

    this.emailsRepository.update({ email, email_id });
  }
}

export { UpdateEmailUseCase, IUpdateEmailDTO };
