import { inject, injectable } from 'tsyringe';

import { Contact } from '../../entities/Contact';
import { IContactsRepository } from '../../repositories/IContactsRepository';

@injectable()
class ListContactByIdUseCase {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  async execute(id: string): Promise<Contact> {
    const contact = await this.contactsRepository.findById(id);

    return contact;
  }
}

export { ListContactByIdUseCase };
