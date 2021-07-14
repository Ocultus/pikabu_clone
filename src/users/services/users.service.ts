import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserService {
  userRepository: any;
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  async findOne(id: User['id']): Promise<User> {
    return this.repository.findOne(id);
  }

  async findByEmail(email: User['email']): Promise<User> {
    return this.repository.findOne({ email });
  }

  async save(email: string): Promise<User> {
    return this.repository.save({ email });
  }
}
