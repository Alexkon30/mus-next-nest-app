import { Request } from 'express';
import { User } from 'src/entity/User';

export default interface RequestWithUser extends Request {
  user: User;
}
