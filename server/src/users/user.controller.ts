import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/entity/User';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public async create(@Body() dto): Promise<User> {
    return this.userService.create(dto);
  }
}
