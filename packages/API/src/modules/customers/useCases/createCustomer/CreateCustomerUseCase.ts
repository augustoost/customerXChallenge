import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

interface ICustomerDTO {
  name: string;
  emails: string[];
  phones: string[];
}

@injectable()
class CreateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute({ name, emails, phones }: ICustomerDTO): Promise<void> {
    const customerAlreadyExists = await this.customersRepository.findByName(
      name,
    );

    if (customerAlreadyExists) {
      throw new AppError('Cliente já cadastrado');
    }

    this.customersRepository.create({ name, emails, phones });
  }
}

export { CreateCustomerUseCase, ICustomerDTO };
