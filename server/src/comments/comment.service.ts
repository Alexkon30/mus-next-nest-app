import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entity/Comment';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  public async create(data): Promise<Comment> {
    const newComment = await this.commentRepository.create(data)[0];
    await this.commentRepository.save(newComment);
    return newComment;
  }
}
