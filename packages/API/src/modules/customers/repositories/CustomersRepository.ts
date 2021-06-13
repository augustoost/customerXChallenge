import { getRepository, Repository } from 'typeorm';

import { CreateEmailController } from '../../emails/useCases/createEmail/CreateEmailController';
import { CreatePhoneController } from '../../phones/useCases/createPhone/CreatePhoneController';

import { Customer } from '../entities/Customer';
import {
  ICustomersRepository,
  ICustomerDTO,
  IUpdateDTO,
} from './ICustomersRepository';

class CustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>;
  private createEmailController: CreateEmailController;
  private createPhoneController: CreatePhoneController;

  constructor() {
    this.repository = getRepository(Customer);
    this.createEmailController = new CreateEmailController();
    this.createPhoneController = new CreatePhoneController();
  }

  async create({ name, emails, phones }: ICustomerDTO): Promise<void> {
    const customer = this.repository.create({
      name,
    });

    await this.repository.save(customer);

    await this.createEmailController.handle({
      customer_id: customer.id,
      emails,
    });
    await this.createPhoneController.handle({
      customer_id: customer.id,
      phones,
    });
  }

  async update({ name, customer_id }: IUpdateDTO): Promise<void> {
    await this.repository.update(
      { id: customer_id },
      {
        name: name,
      },
    );
  }

  async delete(customer: Customer): Promise<void> {
    await this.repository.remove(customer);
  }

  async list(): Promise<Customer[]> {
    const customers = await this.repository.find({
      relations: ['emails', 'phones'],
    });

    return customers;
  }

  async findByName(name: string): Promise<Customer> {
    const customer = await this.repository.findOne({ name });

    return customer;
  }

  async findById(id: string): Promise<Customer> {
    const customer = await this.repository.findOne({
      where: { id },
      relations: ['emails', 'phones'],
    });

    return customer;
  }
}

export { CustomersRepository };
