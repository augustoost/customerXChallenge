import { inject, injectable } from 'tsyringe';

import { Customer } from '../../entities/Customer';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

@injectable()
class ListCustomersUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(): Promise<Customer[]> {
    const customers = await this.customersRepository.list();

    return customers;
  }
}

export { ListCustomersUseCase };
