import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

interface IUpdateCustomerDTO {
  name: string;
  customer_id: string;
}

@injectable()
class UpdateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute({ name, customer_id }: IUpdateCustomerDTO): Promise<void> {
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Customer does not exist.', 404);
    }

    this.customersRepository.update({ name, customer_id });
  }
}

export { UpdateCustomerUseCase, IUpdateCustomerDTO };
