import { getRepository, Repository } from 'typeorm';

import { Email } from '../entities/Email';
import { IEmailsRepository, IEmailDTO, IUpdateDTO } from './IEmailsRepository';

class EmailsRepository implements IEmailsRepository {
  private repository: Repository<Email>;

  constructor() {
    this.repository = getRepository(Email);
  }

  async create({ email, customer_id, contact_id }: IEmailDTO): Promise<void> {
    const emailCreated = this.repository.create({
      email,
      customer_id,
      contact_id,
    });

    await this.repository.save(emailCreated);
  }

  async update({ email, email_id }: IUpdateDTO): Promise<void> {
    await this.repository.update(
      {
        id: email_id,
      },
      {
        email: email,
      },
    );
  }

  async delete(email: Email): Promise<void> {
    await this.repository.remove(email);
  }

  async findEmailByCustomer(
    customer_id: string,
    email: string,
  ): Promise<Email> {
    const emailReturned = await this.repository.findOne({
      where: {
        customer_id,
        email,
      },
    });

    return emailReturned;
  }

  async findEmailByContact(contact_id: string, email): Promise<Email> {
    const emailReturned = await this.repository.findOne({
      where: {
        contact_id,
        email,
      },
    });

    return emailReturned;
  }

  async findById(id: string): Promise<Email> {
    const email = await this.repository.findOne(id);

    return email;
  }
}

export { EmailsRepository };
