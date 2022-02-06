import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Track } from 'src/entity/Track';
import { Comment } from 'src/entity/Comment';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';
import { DeleteResult } from 'typeorm';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  public create(@Body() dto: CreateTrackDto): Promise<Track> {
    return this.trackService.create(dto);
  }

  @Get()
  public getAll(): Promise<Track[]> {
    return this.trackService.getAll();
  }

  @Get(':id')
  public getTrackById(@Param('id') id: number): Promise<Track> {
    const track = this.trackService.getOne(id);
    return track;
  }

  @Delete(':id')
  public removeAll(@Param('id') id: number): Promise<DeleteResult> {
    return this.trackService.deleteTrackById(id);
  }

  @Post('/addComment')
  public addComment(@Body() comment: CreateCommentDto): Promise<Comment> {
    return this.trackService.addComment(comment);
  }
}
