import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Track } from './Track';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public author: string;

  @Column()
  public text: string;

  @ManyToOne(() => Track, (track: Track) => track.comments, {
    cascade: true,
  })
  public track: Track;
}
