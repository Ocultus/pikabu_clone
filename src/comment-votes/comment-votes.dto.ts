import { IsEnum, IsOptional } from 'class-validator';
import { VoteType } from 'src/common/base/base-vote.entity';

export class CreateCommentVoteDto {
  @IsEnum(VoteType)
  voteType: VoteType;
}

export class UpdateCommentVoteDto {
  @IsOptional()
  @IsEnum(VoteType)
  voteType?: VoteType;
}
