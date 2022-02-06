import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Connection } from 'typeorm';
import { AlbumModule } from './albums/album.module';
import { CommentModule } from './comments/comment.module';
import { DatabaseModule } from './database/database.module';
import { TrackModule } from './tracks/track.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    TrackModule,
    AlbumModule,
    UserModule,
    DatabaseModule,
    CommentModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USERNAME: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
