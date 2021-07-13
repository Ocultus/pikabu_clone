import { PickType } from '@nestjs/swagger';
import { User } from './user.entity';

export class ProfileDto extends PickType(User, ['email']) {}
