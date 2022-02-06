import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from 'src/entity/Comment';

@Controller('/comments')
export class CommentController {
  constructor(private commentServise: CommentService) {}

  @Post()
  public async create(@Body() dto): Promise<Comment> {
    return this.commentServise.create(dto);
  }
}
