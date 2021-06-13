import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IPhonesRepository } from '../../repositories/IPhonesRepository';

interface IPhoneDTO {
  phone: string;
  customer_id?: string;
  contact_id?: string;
}

@injectable()
class CreatePhoneUseCase {
  constructor(
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,
  ) {}

  async execute({ phone, customer_id, contact_id }: IPhoneDTO): Promise<void> {
    if (customer_id) {
      const phoneAlreadyExists =
        await this.phonesRepository.findPhoneByCustomer(customer_id, phone);

      if (phoneAlreadyExists) {
        throw new AppError(
          'The customer already has this phone number registered.',
        );
      }
    }

    if (contact_id) {
      const phoneAlreadyExists = await this.phonesRepository.findPhoneByContact(
        contact_id,
        phone,
      );

      if (phoneAlreadyExists) {
        throw new AppError(
          'The contact already has this phone number registered.',
        );
      }
    }

    this.phonesRepository.create({
      phone,
      customer_id,
      contact_id,
    });
  }
}

export { CreatePhoneUseCase, IPhoneDTO };
