import { Customer } from '../entities/Customer';

//Data Transfer Object
interface ICustomerDTO {
  name: string;
  emails: string[];
  phones: string[];
}

interface IUpdateDTO {
  name: string;
  customer_id: string;
}

interface ICustomersRepository {
  create(customer: ICustomerDTO): Promise<void>;
  update({ name, customer_id }: IUpdateDTO): Promise<void>;
  delete(customer: Customer): Promise<void>;
  list(): Promise<Customer[]>;

  findByName(name: string): Promise<Customer>;
  findById(id: string): Promise<Customer>;
}

export { ICustomersRepository, ICustomerDTO, IUpdateDTO };
