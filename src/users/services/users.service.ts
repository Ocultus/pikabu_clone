import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileDto } from '../profile.dto';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserService {
  userRepository: any;
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  async findByEmail(email: User['email']): Promise<User> {
    return this.repository.findOne({ email });
  }

  async save(email: string): Promise<User> {
    return this.repository.save({ email });
  }

  async getProfile(user: User): Promise<ProfileDto> {
    if (!user) {
      throw new UnauthorizedException();
    }
    const email = user.email;
    return { email: email };
  }
}