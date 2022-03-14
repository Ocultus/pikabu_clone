import { EntityRepository, Repository } from 'typeorm';
import { CommentVote } from './comment-vote.entity';

@EntityRepository(CommentVote)
export class CommentVoteRepository extends Repository<CommentVote> {}
