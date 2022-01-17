import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Connection } from 'typeorm';
import { AlbumModule } from './album/album.module';
import { DatabaseModule } from './database.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    TrackModule,
    AlbumModule,
    DatabaseModule,
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
