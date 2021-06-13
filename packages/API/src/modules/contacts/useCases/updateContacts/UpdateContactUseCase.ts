import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IContactsRepository } from '../../repositories/IContactsRepository';

interface IUpdateContactDTO {
  name: string;
  contact_id: string;
}

@injectable()
class UpdateContactUseCase {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  async execute({ name, contact_id }: IUpdateContactDTO): Promise<void> {
    const contactExists = await this.contactsRepository.findById(contact_id);

    if (!contactExists) {
      throw new AppError('Contact does not exist.', 404);
    }

    this.contactsRepository.update({ name, contact_id });
  }
}

export { UpdateContactUseCase, IUpdateContactDTO };
