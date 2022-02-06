import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => Album, (album: Album) => album.tracks)
  album: Album;

  @OneToMany(() => Comment, (comment: Comment) => comment.track, {
    //раскомментировать флаг если нужно, чтобы
    //при каждом обращении к трэкам подгружались комменты
    //но тогда eager перекроет точечный вызов с опцией relations
    // eager: true,
  })
  comments: Comment[];
}
