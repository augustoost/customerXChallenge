import { User } from '../entities/User';

//Data Transfer Object
interface IUsersRepositoryDTO {
  email: string;
  password: string;
}

interface IUsersRepository {
  create({ email, password }: IUsersRepositoryDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository, IUsersRepositoryDTO };
