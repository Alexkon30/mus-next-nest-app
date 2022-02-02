import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entity/Comment';
import { Track } from 'src/entity/Track';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Comment])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
