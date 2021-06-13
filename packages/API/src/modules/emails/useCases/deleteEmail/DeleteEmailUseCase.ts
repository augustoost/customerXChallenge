import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IEmailsRepository } from '../../repositories/IEmailsRepository';

interface IEmailDTO {
  id: string;
}

@injectable()
class DeleteEmailUseCase {
  constructor(
    @inject('EmailsRepository')
    private emailsRepository: IEmailsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const email = await this.emailsRepository.findById(id);

    if (!email) {
      throw new AppError('Email does not exists');
    }

    await this.emailsRepository.delete(email);
  }
}

export { DeleteEmailUseCase, IEmailDTO };
