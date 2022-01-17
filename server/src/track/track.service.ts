import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from 'src/entity/Track';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  public async create(dto: CreateTrackDto): Promise<Track> {
    const track = this.trackRepository.save({ ...dto, listens: 0 });
    return track;
  }

  public async getAll() {
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  public async getOne(id: number): Promise<Track> {
    const track = await this.trackRepository.findOne(id);
    return track;
  }

  public async deleteTrackById(id: number) {
    const deleteResponse = await this.trackRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }
}
