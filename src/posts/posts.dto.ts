import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(3)
  title: string;
  @IsString()
  @MinLength(10)
  description: string;
}

export class UpdatePostDto {
  @IsString()
  @MinLength(6)
  @IsOptional()
  title: string;
  @IsString()
  @MinLength(6)
  @IsOptional()
  description: string;
}
