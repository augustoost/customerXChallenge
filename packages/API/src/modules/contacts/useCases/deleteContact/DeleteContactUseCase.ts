import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IContactsRepository } from '../../repositories/IContactsRepository';

interface ICustomerDTO {
  id: string;
}

@injectable()
class DeleteContactUseCase {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const contact = await this.contactsRepository.findById(id);

    if (!contact) {
      throw new AppError('Contact does not exists', 404);
    }

    await this.contactsRepository.delete(contact);
  }
}

export { DeleteContactUseCase, ICustomerDTO };
