import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Track } from './Track';

@Entity()
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  picture: string;

  @OneToMany(() => Track, (track) => track.id, {
    cascade: true,
    eager: true,
  })
  tracks: Track[];
}
