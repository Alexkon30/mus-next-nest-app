import { UserService } from 'src/users/user.service';
import { RegisterUserDto } from './dto/register.dto';
import bcrypt from 'bcrypt';
import { PostgresErrorCodes } from 'src/database/postgresErrorCodes.enum';
import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthenticationService {
  constructor(private readonly userService: UserService) {}

  public async register(registerData: RegisterUserDto) {
    const hashedPass = await bcrypt.hash(registerData.password, 10);
    try {
      const createdUser = await this.userService.create({
        ...registerData,
        password: hashedPass,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCodes.UniqueViolation) {
        throw new HttpException(
          'User with that email already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
