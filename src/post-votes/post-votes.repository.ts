import { EntityRepository, Repository } from 'typeorm';
import { PostVote } from './post-vote.entity';

@EntityRepository(PostVote)
export class PostVoteRepository extends Repository<PostVote> {}
