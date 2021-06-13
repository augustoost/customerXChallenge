import { Phone } from '../entities/Phone';

//Data Transfer Object
interface IPhoneDTO {
  phone: string;
  customer_id?: string;
  contact_id?: string;
}

interface IUpdateDTO {
  phone: string;
  phone_id: string;
}

interface IPhonesRepository {
  create(phone: IPhoneDTO): Promise<void>;
  update({ phone, phone_id }: IUpdateDTO): Promise<void>;
  delete(phone: Phone): Promise<void>;

  findPhoneByCustomer(customer_id: string, phone: string): Promise<Phone>;
  findPhoneByContact(contact_id: string, phone: string): Promise<Phone>;
  findById(id: string): Promise<Phone>;
}

export { IPhonesRepository, IPhoneDTO, IUpdateDTO };
