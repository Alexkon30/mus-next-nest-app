import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Track } from 'src/entity/Track';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  public create(@Body() dto: CreateTrackDto): Promise<Track> {
    return this.trackService.create(dto);
  }

  @Get()
  public getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  public getTrackById(@Param('id') id: number) {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  public removeAll(@Param('id') id: number) {
    return this.trackService.deleteTrackById(id);
  }
}
