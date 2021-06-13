import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { IUsersRepository, IUsersRepositoryDTO } from './IUsersRepository';

class UserRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ email, password }: IUsersRepositoryDTO): Promise<void> {
    const user = this.repository.create({
      email,
      password,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }
}

export { UserRepository };
