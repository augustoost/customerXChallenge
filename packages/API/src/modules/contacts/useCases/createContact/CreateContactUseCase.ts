import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IContactsRepository } from '../../repositories/IContactsRepository';

interface IContactDTO {
  name: string;
  customer_id: string;

  emails: string[];
  phones: string[];
}

@injectable()
class CreateContactUseCase {
  constructor(
    @inject('ContactsRepository')
    private contactRepository: IContactsRepository,
  ) {}

  async execute({
    customer_id,
    name,
    emails,
    phones,
  }: IContactDTO): Promise<void> {
    const contactAlreadyExists = await this.contactRepository.findByName(name);

    if (contactAlreadyExists) {
      throw new AppError('O contato já está cadastrado');
    }

    this.contactRepository.create({ customer_id, name, emails, phones });
  }
}

export { CreateContactUseCase, IContactDTO };
