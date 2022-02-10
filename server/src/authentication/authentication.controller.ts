import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/entity/User';
import { AuthenticationService } from './authentication.service';
import { RegisterUserDto } from './dto/register.dto';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  public async register(@Body() registrationData: RegisterUserDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  public async login(@Req() request: RequestWithUser): Promise<User> {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
