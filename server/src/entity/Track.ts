import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from './Album';
import { Comment } from './Comment';

@Entity()
export class Track extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  artist: string;

  @Column()
  text: string;

  @Column()
  listens: number;

  // @Column()
  // picture: string;

  // @Column()
  // audio: string;

  // @OneToOne(() => Album)
  // @JoinColumn()
  // album: Album;

  // @OneToMany(() => Comment, (comment) => comment.id)
  // comments: Comment[];
}
