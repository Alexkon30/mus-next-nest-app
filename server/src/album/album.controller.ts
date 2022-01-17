import { Controller, Get } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('/albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @Get()
  public getAllAlbums() {
    return this.albumService.getAll();
  }

  @Get('/one')
  public getOne() {
    return this.albumService.getOne();
  }
}
