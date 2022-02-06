import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from 'src/entity/Track';
import { Comment } from 'src/entity/Comment';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  public async create(dto: CreateTrackDto): Promise<Track> {
    const newTrack = await this.trackRepository.create({
      ...dto,
      listens: 1,
      comments: [],
    });
    await this.trackRepository.save(newTrack);
    return newTrack;
  }

  public async getAll(): Promise<Track[]> {
    const tracks = await this.trackRepository.find();
    console.log(tracks);
    return tracks;
  }

  public async getOne(id: number): Promise<Track> {
    const track = await this.trackRepository.findOne(id, {
      //Расширяя объект этим свойством указываем какие данные подгружать.
      //Без него трек загрузится без комментов
      //Либо нужно в схеме Track указать eager: true, но тогда
      //комменты будут подргружаться при любом запросе к трэкам
      //
      relations: ['comments'],
    });
    return track;
  }

  public async deleteTrackById(id: number): Promise<DeleteResult> {
    const deleteResponse = await this.trackRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return deleteResponse;
  }

  public async addComment(comment: CreateCommentDto): Promise<Comment> {
    const track = await this.trackRepository.findOne(comment.trackId);
    const newComment = await this.commentRepository.create({
      // author: comment.author,
      // text: comment.text,
      ...comment,
      track: track,
    });

    //TODO: протестировать происходит ли каскадное обновление
    //по схеме - трек должен обновиться после добавления какого либо комментария
    //
    // track.comments.push(newComment);
    // console.log(newComment);
    // console.log(track);
    // await this.trackRepository.save(track);
    await this.commentRepository.save(newComment);
    return newComment;
  }
}
