import { getRepository, Repository } from 'typeorm';

import { Phone } from '../entities/Phone';
import { IPhonesRepository, IPhoneDTO, IUpdateDTO } from './IPhonesRepository';

class PhonesRepository implements IPhonesRepository {
  private repository: Repository<Phone>;

  constructor() {
    this.repository = getRepository(Phone);
  }

  async create({ phone, customer_id, contact_id }: IPhoneDTO): Promise<void> {
    const phoneCreated = this.repository.create({
      phone,
      customer_id,
      contact_id,
    });

    await this.repository.save(phoneCreated);
  }

  async update({ phone, phone_id }: IUpdateDTO): Promise<void> {
    await this.repository.update(
      {
        id: phone_id,
      },
      {
        phone,
      },
    );
  }

  async delete(phone: Phone): Promise<void> {
    await this.repository.remove(phone);
  }

  async findPhoneByCustomer(
    customer_id: string,
    phone: string,
  ): Promise<Phone> {
    const phoneReturned = await this.repository.findOne({
      where: {
        customer_id,
        phone,
      },
    });

    return phoneReturned;
  }

  async findPhoneByContact(contact_id: string, phone: string): Promise<Phone> {
    const phoneReturned = await this.repository.findOne({
      where: {
        contact_id,
        phone,
      },
    });

    return phoneReturned;
  }

  async findById(id: string): Promise<Phone> {
    const phone = await this.repository.findOne(id);

    return phone;
  }
}

export { PhonesRepository };
