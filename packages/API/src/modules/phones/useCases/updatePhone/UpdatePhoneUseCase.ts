import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IPhonesRepository } from '../../repositories/IPhonesRepository';

interface IUpdatePhoneDTO {
  phone: string;
  phone_id: string;
}

@injectable()
class UpdatePhoneUseCase {
  constructor(
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,
  ) {}

  async execute({ phone, phone_id }: IUpdatePhoneDTO): Promise<void> {
    const phoneExists = await this.phonesRepository.findById(phone_id);

    if (!phoneExists) {
      throw new AppError('Phone does not exist.');
    }

    this.phonesRepository.update({ phone, phone_id });
  }
}

export { UpdatePhoneUseCase, IUpdatePhoneDTO };
