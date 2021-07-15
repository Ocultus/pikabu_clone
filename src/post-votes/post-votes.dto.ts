import { IsEnum, IsOptional } from 'class-validator';
import { VoteType } from './post-vote.entity';

export class CreatePostVoteDto {
  @IsEnum(VoteType)
  voteType: VoteType;
}

export class UpdatePostVoteDto {
  @IsOptional()
  @IsEnum(VoteType)
  voteType?: VoteType;
}
