import { Contact } from '../entities/Contact';

//Data Transfer Object
interface IContactsRepositoryDTO {
  customer_id: string;
  name: string;
  emails: string[];
  phones: string[];
}

interface IUpdateDTO {
  name: string;
  contact_id: string;
}

interface IContactsRepository {
  create(contact: IContactsRepositoryDTO): Promise<void>;
  update({ name, contact_id }: IUpdateDTO): Promise<void>;
  delete(contact: Contact): Promise<void>;
  list(): Promise<Contact[]>;
  listByCustomerId(customer_id: string): Promise<Contact[]>;
  findByName(name: string): Promise<Contact>;
  findById(id: string): Promise<Contact>;
}

export { IContactsRepository, IContactsRepositoryDTO, IUpdateDTO };
