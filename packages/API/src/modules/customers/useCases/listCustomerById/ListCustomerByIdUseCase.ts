import { inject, injectable } from 'tsyringe';

import { Customer } from '../../entities/Customer';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

@injectable()
class ListCustomerByIdUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(id: string): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    return customer;
  }
}

export { ListCustomerByIdUseCase };
