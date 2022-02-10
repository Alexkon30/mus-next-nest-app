import { UserService } from 'src/users/user.service';
import { RegisterUserDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCodes } from 'src/database/postgresErrorCodes.enum';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/entity/User';

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

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<User | void> {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
