import { Email } from '../entities/Email';

//Data Transfer Object
interface IEmailDTO {
  email: string;
  customer_id?: string;
  contact_id?: string;
}

interface IUpdateDTO {
  email: string;
  email_id: string;
}

interface IEmailsRepository {
  create(email: IEmailDTO): Promise<void>;
  update({ email, email_id }: IUpdateDTO): Promise<void>;
  delete(email: Email): Promise<void>;

  findEmailByCustomer(customer_id: string, email: string): Promise<Email>;
  findEmailByContact(contact_id: string, email: string): Promise<Email>;
  findById(id: string): Promise<Email>;
}

export { IEmailsRepository, IEmailDTO, IUpdateDTO };
