import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostTagDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdatePostTagDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
}
