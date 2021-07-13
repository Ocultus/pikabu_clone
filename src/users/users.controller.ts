import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProfileDto } from './profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserService } from './services/users.service';
import { User } from './user.entity';
import { User as UserDecorator } from './users.decorator';

@ApiTags('users')
@Controller('users')
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 403, description: 'Forbidden' })
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current profile' })
  @ApiOkResponse({
    description: 'The profile has been successfully got',
    type: ProfileDto,
  })
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@UserDecorator() user: User): Promise<ProfileDto> {
    return this.userService.getProfile(user);
  }
}
