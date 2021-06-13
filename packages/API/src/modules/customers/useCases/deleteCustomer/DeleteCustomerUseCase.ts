import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

interface ICustomerDTO {
  id: string;
}

@injectable()
class DeleteCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer does not exists');
    }

    await this.customersRepository.delete(customer);
  }
}

export { DeleteCustomerUseCase, ICustomerDTO };
