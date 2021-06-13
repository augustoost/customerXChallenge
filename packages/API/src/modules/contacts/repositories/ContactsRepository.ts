import { getRepository, Repository } from 'typeorm';
import { AppError } from '../../../errors/AppError';

import { CreateEmailController } from '../../emails/useCases/createEmail/CreateEmailController';
import { CreatePhoneController } from '../../phones/useCases/createPhone/CreatePhoneController';

import { Contact } from '../entities/Contact';
import {
  IContactsRepository,
  IContactsRepositoryDTO,
  IUpdateDTO,
} from './IContactsRepository';

class ContactsRepository implements IContactsRepository {
  private repository: Repository<Contact>;
  private createEmailController: CreateEmailController;
  private createPhoneController: CreatePhoneController;

  constructor() {
    this.repository = getRepository(Contact);
    this.createEmailController = new CreateEmailController();
    this.createPhoneController = new CreatePhoneController();
  }

  async create({
    customer_id,
    name,
    emails,
    phones,
  }: IContactsRepositoryDTO): Promise<void> {
    const contact = this.repository.create({
      customer_id,
      name,
    });

    await this.repository.save(contact);

    await this.createEmailController.handle({
      contact_id: contact.id,
      emails,
    });
    await this.createPhoneController.handle({
      contact_id: contact.id,
      phones,
    });
  }

  async update({ name, contact_id }: IUpdateDTO): Promise<void> {
    await this.repository.update(
      { id: contact_id },
      {
        name: name,
      },
    );
  }

  async delete(contact: Contact): Promise<void> {
    await this.repository.remove(contact);
  }

  async list(): Promise<Contact[]> {
    const contacts = await this.repository.find({
      relations: ['emails', 'phones'],
    });

    return contacts;
  }

  async listByCustomerId(customer_id: string): Promise<Contact[]> {
    const contacts = await this.repository.find({
      where: {
        customer_id,
      },
      relations: ['emails', 'phones'],
    });

    return contacts;
  }

  async findByName(name: string): Promise<Contact> {
    const contact = await this.repository.findOne({ name });

    return contact;
  }

  async findById(id: string): Promise<Contact> {
    const contact = await this.repository.findOne({
      where: { id },
      relations: ['emails', 'phones'],
    });

    return contact;
  }
}

export { ContactsRepository };
