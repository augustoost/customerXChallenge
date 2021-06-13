import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IPhonesRepository } from '../../repositories/IPhonesRepository';

interface IPhoneDTO {
  id: string;
}

@injectable()
class DeletePhoneUseCase {
  constructor(
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const phone = await this.phonesRepository.findById(id);

    if (!phone) {
      throw new AppError('Phone does not exists');
    }

    await this.phonesRepository.delete(phone);
  }
}

export { DeletePhoneUseCase, IPhoneDTO };
