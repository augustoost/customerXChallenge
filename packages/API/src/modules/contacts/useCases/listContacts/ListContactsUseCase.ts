import { inject, injectable } from 'tsyringe';

import { Contact } from '../../entities/Contact';
import { IContactsRepository } from '../../repositories/IContactsRepository';

@injectable()
class ListContactsUseCase {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  async execute(): Promise<Contact[]> {
    const contacts = await this.contactsRepository.list();

    return contacts;
  }
}

export { ListContactsUseCase };
