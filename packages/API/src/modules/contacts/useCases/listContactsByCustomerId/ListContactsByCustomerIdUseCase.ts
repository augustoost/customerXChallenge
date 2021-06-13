import { inject, injectable } from 'tsyringe';

import { Contact } from '../../entities/Contact';
import { IContactsRepository } from '../../repositories/IContactsRepository';

@injectable()
class ListContactsByCustomerIdUseCase {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  async execute(customer_id: string): Promise<Contact[]> {
    const contacts = await this.contactsRepository.listByCustomerId(
      customer_id,
    );

    return contacts;
  }
}

export { ListContactsByCustomerIdUseCase };
