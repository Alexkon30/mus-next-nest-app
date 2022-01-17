import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumService {
  public getAll() {
    return 'get all albums';
  }

  public getOne() {
    return 'get one album';
  }
}
